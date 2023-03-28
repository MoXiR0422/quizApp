const passport = require('passport');
const { collection } = require('../model/user');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const Auth = require('../model/user')
collection.dropIndexes()
const jwt = require('jsonwebtoken')
const { generateToken } = require('./generateToken')
const { generateRefreshToken } = require('./refreshToken')

require('dotenv').config()
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/auth/google/callback",
    profileFields: ['emails'] 
  },
  async function(accessToken, refreshToken, profile, cb) {
    
    const find = await Auth.findOne({ googleId: profile.id })
    accessToken = await generateToken(find.id)
    refreshToken = await generateRefreshToken(find.id)
    let newUser = {
      username: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      googleId: profile.id,
      token: accessToken,
      isValid: true,
    }
    
    console.log(newUser)
    if(find){
       const updateToken = await Auth.findByIdAndUpdate(find.id, { refreshToken: refreshToken }, {new: true})
       return cb(null, updateToken)
    }else{
      const add = await Auth.create(newUser)
      console.log(newUser)
      return cb(null, add)
    }
   
}));
    