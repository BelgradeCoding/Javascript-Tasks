var methods = (function(){
  function replaceVarNames(match, p1, p2, offset, string) {
    let key, type, nameVar, infoVar;
    key = p1;
    type = p2;
    (nameVar = task.varNames[key]),
      (infoVar = storeVarInfo(nameVar, type, key));
    checkAndAddToUsedKeys(infoVar);
    if(p1 === "g" || p2 === "$g"){
      console.log(match,offset)
    }
   
    
    return nameVar;
  }

  function redeclareVars(match, p1, p2, offset, string){
    if(match === "$rdc_"){
      return random(0, 1) === 1 ? "var " : "";
    } else {
      let typeOfVar = dataTypes[p1];
      let arrayOfType = getSpecificVarTypes(task.usedVarNames, typeOfVar);
      let rnd = random(0, arrayOfType.length - 1);
      let nameVar = arrayOfType[rnd].name;
      return random(0, 1) === 1 ? "var " + nameVar : nameVar; 
    }
  }
  
  return {
    replaceVarNames,
    redeclareVars
  }
})();
