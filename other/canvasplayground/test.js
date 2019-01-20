var PIXEL_RATIO = (function() {
  var ctx = document.createElement("canvas").getContext("2d"),
    dpr = window.devicePixelRatio || 1,
    bsr =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;

  return dpr / bsr;
})();
createHiDPICanvas = function(w, h, ratio) {
  if (!ratio) {
    ratio = PIXEL_RATIO;
  }
  var can = document.createElement("canvas");
  can.width = w * ratio;
  can.height = h * ratio;
  can.style.width = w + "px";
  can.style.height = h + "px";
  can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
  return can;
};
var str = `var kme = 23;var kme1 = 32;var kme2 = 12;
  var kme = 23;var kme1 = 32;var kme2 = 12;var kme = 23;var kme1 = 32;var kme2 = 12;
  var kme = 23;var kme1 = 32;var kme2 = 12;var kme = 23;var kme1 = 32;var kme2 = 12;
  var kme = 23;var kme1 = 32;var kme2 = 12;var kme = 23;var kme1 = 32;var kme2 = 12;
  var kme = 23;var kme1 = 32;var kme2 = 12;
  `;

var assigment = [
  `var alfa = 2;
  var beta = 3;
  var gama = 10;
  var sigma = 2;
  var jota = (function (){
          omega = 3;
          var beta = 6;
          console.log("alfa", alfa, "gama", gama);
          var teta = zeta()[0]();
          var sigma = 6;
          var omega = 5;
          console.log("alfa", alfa, "beta", beta);
          function zeta() {
              var alfa = 0;
              var beta = 1;
              console.log("alfa", alfa, "beta", beta);
              return [function(){
                  var alfa = 8;
                  beta = 5;
                  console.log("alfa", alfa, "beta", beta);
              }]
          }
      return zeta();
  })();`,
  `var alpha = 23;varbetavargamefunction
  var kuracvar penis varkfoavarvkdavar
  `
];
var y = 0;
var yIndex = 15;
var ass = assigment[0].split("\n");
var canvasHeight = ass.length * yIndex + 10;

// canvas init
var canvas = createHiDPICanvas(600, canvasHeight, 1);
document.body.appendChild(canvas);
var context = canvas.getContext("2d");
context.font = "1.1rem Georgia";
context.fillStyle = "blue";

function colorCanvas(task) {
  for (var k = 0; k < task.length; k++) {
    var line = task[k];

    y += yIndex;
    texter(line, 0, y);
  }
}
colorCanvas(ass);

function texter(str, x, y) {
  var strInfo = getAllIndexes(str, ["var", "function", "=", "return","console.log"]);
  var kme = getAllNumbers(str);
  if(kme){
    strInfo.push(kme);
  } 
  var indexes = [];
  for (const key in strInfo) {
    if (strInfo.hasOwnProperty(key)) {
      const element = strInfo[key];
      indexes.push(element.index);
    }
  }
  
  
  for (var i = 0, z = 0; i < str.length; i++) {
    var ch = str.charAt(i);
    var position = indexes.indexOf(i);
    if (position >= 0) {
      for (var j = 0; j < strInfo[position]["len"]; j++) {
        // vars and function
        ch = str.charAt(i + j);
        if (
          strInfo[position].name === "var" ||
          strInfo[position].name === "function"
        ) {
          colorFillChange(ch, x, y, "red");
        } else if (strInfo[position].name === "return") {
          colorFillChange(ch, x, y, "purple");
        } else if (strInfo[position].name === "=") {
          colorFillChange(ch, x, y, "gray");
        } else if (strInfo[position].name === "number"){
          colorFillChange(ch, x, y, "green");
        } else if (strInfo[position].name === "console.log"){
          colorFillChange(ch, x, y, "blue");
        }
        x += context.measureText(ch).width;
        z++;
        if (z == strInfo[position]["len"]) {
          z = 0;
          i += strInfo[position]["len"] - 1;
          break;
        }
      }
    } else {
      colorFillChange(ch, x, y, "black");
      x += context.measureText(ch).width;
    }
  }
}

function colorFillChange(char, x, y, color) {
  context.fillStyle = color;
  context.fillText(char, x, y);
}

function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1;
  for (var k = 0; k < val.length; k++) {
    while ((i = arr.indexOf(val[k], i + 1)) != -1) {
      indexes.push({
        name: val[k],
        index: i,
        len: val[k].length
      });
    }
  }
  if (indexes.length == 0) {
    return undefined;
  }
  return indexes;
}
function getAllNumbers(str) {
  var re = /\d+/g,
    str = str;
  tmpArr = [];
  while ((match = re.exec(str)) != null) {
    tmpArr.push(match);
  }
  if(tmpArr.length > 0){
    return {
      name:"number",
      index:tmpArr[0].index,
      len: tmpArr[0][0].length
    }
  }
  
}
var lala = "weaedsa32321";
var kkk = getAllNumbers(lala);


function removeEmptyObj(arr) {
  if (arr != undefined) {
    var tmp = JSON.stringify(
      arr.filter(function(el) {
        return typeof el != "object" || Object.keys(el).length > 0;
      })
    );
    return JSON.parse(tmp);
  } else {
    return undefined;
  }
}
