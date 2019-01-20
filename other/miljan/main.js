let variableNames = [
  {
    a: "lorem",
    b: "ipsum",
    c: "dolor",
    d: "sit",
    e: "amet",
    f: "consequentum",
    g: "rubor",
    h: "calor",
    i: "bar"
  },
  {
    a: "alfa",
    b: "beta",
    c: "gama",
    d: "delta",
    e: "jota",
    f: "teta",
    g: "zeta",
    h: "sigma",
    i: "omega"
  }
];
let dataTypes = {
  O: "object",
  K: "object_key",
  N: "number",
  S: "string",
  A: "array",
  F: "function",
  B: "boolean"
};

// Constructors

let Challenge = function(varNames) {
  this.varNames = varNames;
  this.usedVarNames = [];
};

Challenge.prototype.getKeyNames = function(keysArr) {
  let keyNames = objectProperties(keysArr);
  return getValues(keysArr, keyNames);
};

function getValues(obj, keys) {
  var arr = [];
  for (var i = 0; i < keys.length; i++) {
    arr.push(obj[keys[i]]);
  }
  return arr;
}

let index = random(0, variableNames.length - 1);
var task = new Challenge(variableNames[index]);
task.usableVarNames = task.getKeyNames(task.varNames);



// To-Do : Randomizacija pozicija unutar niza

// funkcija za cuvanje rezultata
let result = "";
function logResult(...params) {
  result += params.join(" ") + "\n";
}

// assigment
let jScript = assigment[0];



/////////// VAR NAME DISTRIBUTION ////////////
/**
 * Command : [$]+[$key] 
 * -
 * example : var $a = $b; // var ipsum = lorem;
 *  
 * Variables that are initiated in this way, get paired with variable name in global variable object and stay locked until the parser is done with it's. That means, that all usages of the command [$]+["key"] get's picked up by our parser as a signal to replace the names of said keys to variable names. We can reference them by their keys ([$[key]]) at any given time in our program.
 * 
 * Complete reusability. The [[$][key]] command can be used to declare/redeclare almost every data type (except objects). Also, it is valid when used in logs.
 * 
 * Basic commands: 
 * var [$a] // var [lorem]
 * 
 * var [$b] // var [ipsum]
 * 
 * [$a] + [$b] // [lorem] + [ipsum] 


 * Command : [$]+[$key]_[λ]+[data-type]
 * -
 * example : var $a_λN = $num; // var lorem = 23;
 * 
 * This used for configuration purposes, we want to be able to differentiate used variables by their data type. Depending on the key used, we match that key with the value in the global object of data-types. Later on, if we need specific data-type in our program, we just reference it by it's key.
 */

jScript = jScript.replace(
  /\$\b(\w)\b/g,
  methods.replaceVarNames)

jScript = jScript.replace(
  /\$\b(\w{1})_λ(\w+)\b/g,
  methods.replaceVarNames)


jScript = jScript.replace(
  /\$\b(\w{1})\b|\b\.\$(\w{1})\b/g,
  (match, p1, p2, offset, string) => {
    let key = p1 === undefined ? p2 : p1;
    let nameVar;
    let objVar = getUsedVar(task.usedVarNames, key);
    if (objVar.type.indexOf("function") >= 0) {
      nameVar = objVar.name + "()";
    } else {
      nameVar = objVar.name;
    }
    return p2 === undefined ? nameVar : "." + nameVar;
  }
);
/* LOG IS REDUNTANT>>> DELETING PENDING
jScript = jScript.replace(
  /\$log_\$(\w)((\.\$(\w))+)/g,
  (match, p1, p2, p3, p4, offset, string) => {
    let str = match;
    str = str.replace(/log|[^a-zA-Z]/g, match => {
      return "";
    });
    let tmpArr = str.split("");
    let test = [];
    tmpArr.forEach(function(item) {
      let obj = getUsedVar(task.usedVarNames, item);
      if (obj.type.indexOf("function") >= 0) {
      } else {
        test.push(obj.name);
      }
    });

    return test.join(".");
  }
);
*/

// Assigning random variable names to all kinds of data-types. Usually, these types of variables do not go to log function, but can be used to manipulate outcomes of such. We have limited capacity at referencing them but it can be done.
/* Keywords :
 *$rnd_λ[specific-data-type] === choosing random variable name that is not used and assigning it a specific value/data type (string,number,boolean,object..)

 *$rnd_V === getting a random "JUNK" variable, which won't be reused, it's job is mostly to confuse. It can be of any data type,doesnt matter. While it can be used to manipulate data, it's reusability value is low.
*/
jScript = jScript.replace(
  /\$rnd_λ(\w+)|\$(rnd_V)/g,
  (match, p1, p2, offset, string) => {
    let nameVar;
    rnd = random(0, task.usableVarNames.length - 1);
    if (p2 == undefined) {
      let type = p1;
      nameVar = task.usableVarNames[rnd];
      var infoVar = storeVarInfo(nameVar, type);
    } else {
      nameVar = task.usableVarNames[rnd];
      var infoVar = storeVarInfo(nameVar);
    }

    checkAndAddToUsedKeys(infoVar);
    return nameVar
  }
);

jScript = jScript.replace(
  /\$used_λ(\w+)|\$(used_V)/g,
  (match, p1, p2, offset, string) => {
    let nameVar,
    tmpArr,
    rnd = random(0, task.usableVarNames.length - 1);
    if (p2 == undefined) {
      let type = p1;
      tmpArr = getSpecificVarTypes(task.usedVarNames,type);
    } else {
      tmpArr = task.usedVarNames;
    }
    nameVar = tmpArr[rnd]["name"];
    return  nameVar;
  }
);





// Redeclaring already used variables. We choose random USED variable, and we declare it's new value. We can reference the variables we used by it's KEY or by it's DATA-TYPE. Program chooses whether to add the "var" keyword or not, it's completely random.

jScript = jScript.replace(
  /\$rdc_λ(.)|\$rdc_/g,
  methods.redeclareVars
);

/*
Keywords:
     ---  $rdc_$[specific-used-varname] --- We change the value of "$rdc_" to be with either var or no var. Variable re-assigning is done with the method "replaceVarNames".

     ---- $rdc_λ[specific-used-data-type] --- similary, if we don't want to be that specific which variable we want to redeclare, we can use the data type referencer, and use random used variable of a given data-type.
*/




// Logging the result. We ask the user to guess the values of variables or calulations given in this log call. Any data-type can be part of this call. We can target specific values to be printed, or completely random. This below is targeted.
/**
 * Keywords:
 *
 * $log_$[specific-variable]
 *
 */
// jScript = jScript.replace(/\$log_\$(.)/g, (match, p1, offset, string) => {
//   var nameVar = getProperty(task.usedVarNames, p1);
//   if (nameVar != undefined) {
//     return nameVar;
//   }
// });

jScript = jScript.replace(/\$(num+)/g, (match, p1, offset, string) => {
  return rN(0, 15);
  // Todo - build an global array filled with random numbers.
  // Add chance for negative values
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
