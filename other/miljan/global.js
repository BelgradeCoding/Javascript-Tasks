// Helper Functions
function objectProperties(obj) {
    return Object.keys(obj);
};

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let rN = () => random(0, 10);


function storeVarInfo(name, type, key) {
    let typeArray = [];
    if (key == undefined) {
      var keys = objectProperties(task.varNames);
      for (var i = 0; i < keys.length; i++) {
        if (task.varNames[keys[i]] == name) {
          key = keys[i][0];
        }
      }
    }
    if (type != undefined && type.length > 1) {
      let tmpArr = type.split("");
      for (var i = 0; i < tmpArr.length; i++) {
        typeArray.push(dataTypes[tmpArr[i]]);
      }
    } else if (type != undefined && type.length == 1) {
      typeArray = dataTypes[type];
    } else {
      typeArray = "random";
    }
    return {
      key,
      name,
      type: typeArray
    };
  }
  function checkAndAddToUsedKeys(obj) {
    var found = task.usedVarNames.some(function(el) {
      return el.key === obj.key;
    });
    if (!found) {
      task.usedVarNames.push(obj);
      task.usableVarNames.splice(task.usableVarNames.indexOf(obj["name"]), 1);
    }
  }

  function getProperty(arr, key) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].key == key) {
        return arr[i].name;
      }
    }
  }
  function getUsedVar(arr, key) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].key == key) {
        return arr[i];
      }
    }
  }
  function getSpecificVarTypes(arr, type) {
    let tmp = [];
    arr.forEach(function(entry) {
      if (entry.type == type) {
        tmp.push(entry);
      }
    });
    return tmp;
  }
  