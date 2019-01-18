// Imena variabli
let variableNames = [
    {
      a: "alpha",
      b: "beta",
      c: "gama",
      d: "delta",
      e: "epsilon"
    },
    {
      a: "first",
      b: "second",
      c: "third",
      d: "fourth",
      e: "fifth"
    }
  ];
  let assigment = [
    `
    //#insertBegin
    $newV = ${rN()};//#swapvar
    $newV = ${rN()};//#swapvar
    $newV = ${rN()};//#swapvar
    //#insertEnd
        function $newFunc(){
            //#insertBegin
            //#insertEnd
            $redecV = ${rN()};//#swapvar
            return $usedV $operator $usedV;
        }
    $newFunc();//#canCall //#swapfunc
    console.log($logV, $logV);
    console.log($newFunc());
    `
  ]
  
  // Funckije
  let funcNames = ["func1","func2","func3","func4"];
  
  // Constructors
  
  let Keys = function(varNames){
    this.varNames = varNames;
  }
  let Challenge = function(assigment) {
    this.assigment = assigment;
  };
  
  
  Keys.prototype.getKeyNames = function(keysArr){
    let index = random(0, variableNames.length - 1);
    let keyNames = getVarNames(keysArr[index]);
    return getValues(keysArr[index], keyNames);
  }
  
  function getVarNames(obj) {
    return Object.keys(obj);
  }
  
  function getValues(arr, keyNames){
    let newArr =[];
    for(let i=0; i < keyNames.length; i++){
      newArr.push(arr[keyNames[i]]);
    }
    return newArr;
  }
  
  let assigmentKeys = new Keys(variableNames);
  assigmentKeys.activeVarNames = assigmentKeys.getKeyNames(assigmentKeys.varNames);
  assigmentKeys.usedVarNames = [];
  
  // To-Do : Randomizacija pozicija unutar niza
  
  let activeNames = JSON.parse(JSON.stringify(assigmentKeys.activeVarNames));
  
  let primer = new Challenge(assigment[0]);
  
  
  
  
  // funkcija za cuvanje rezultata
  let result = "";
  function logResult(...params) {
    result += params.join(" ") + "\n";
  }
  
  // dodela paterna
  let jScript = primer.assigment;
  
  /////////// obrada paterna /////////////////////+
  
  // Deklarisanje novih variabli sa var
  jScript = jScript.replace(/\$(newV)/g, (match, p1, offset, string) => {
    let variableName = activeNames.shift();
    assigmentKeys.usedVarNames.push(variableName);
    
    return "var " + variableName;
  });
  
  
  // Deklarisanje iskoriscenih variabli sa var ili bez
  jScript = jScript.replace(/\$(redecV+)/g, (match, p1, offset, string) => {
    let randomUsedVar = assigmentKeys.usedVarNames[random(0, assigmentKeys.usedVarNames.length - 1)];
    
    return random(0, 1) === 1
      ? randomUsedVar
      : "var " + randomUsedVar;
  });
  
  // Koriscenje variabli bez deklaracije (return,parametri,..)
  jScript = jScript.replace(/\$(usedV)/g, (match, p1, offset, string) => {
    return assigmentKeys.usedVarNames[random(0, assigmentKeys.usedVarNames.length - 1)];
  });
  
  // Ispis log-a, s tim sto cemo moci da manipulisemo koji podatak zelimo da udje u ispis (dodavanjem specijalnog slucaja i slicno)
  jScript = jScript.replace(/\$(logV+)/g, (match, p1, offset, string) => {
    //To-Do : slucaj kada ciljamo ispis
    return assigmentKeys.usedVarNames[random(0, assigmentKeys.usedVarNames.length - 1)];
  });
  
  
  // Poziv funkcije
  jScript = jScript.replace(/(\$newFunc\(\)..\/\#canCall+)/g, (match, p1, offset, string) => {

    // To do : Generisanje imena funkcija, generisanje arraya sa iskoriscenim funkcijama..
    return random(0, 1) === 1 ? "$newFunc();" : "";
  });
  
  // Zamena operatora
  jScript = jScript.replace(/\$(operator)/g, (match, p1, offset, string) => {
    return random(0, 1) === 1 ? "+" : "-";
  });
  
  // obradjeni patern za prikaz korisniku
  let jScriptOriginal = jScript;
  
  // dodela return-a
  jScript = jScript.replace(/console.log/g, "logResult");
  jScript += "return result";
  
  // kreiranje funkcije
  let finalFunction = new Function(jScript);
  
  //prikaz rezultata i paterna za korisnika
  console.log(jScriptOriginal);
  console.log(finalFunction());
  