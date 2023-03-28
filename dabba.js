const work = [
    { id: 1, name: "John", job: "developer" },
    { id: 2, name: "Mary", job: "designer" },
    { id: 3, name: "Bob", job: "developer" },
  ];
  
  // Check if an object with id 2 exists in the work array
  const hasId2 = work.some(obj => obj.id === 1);
  console.log(hasId2); 