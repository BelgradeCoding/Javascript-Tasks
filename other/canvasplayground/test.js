// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");
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

var names = [
  {
    a: "kme",
    b: "kme1",
    c: "kme2"
  }
];
var kme = 12;
var ass = `var alfa = 2;
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
})();`;
ass = ass.split("\n");
var yIndex = 14;
var canvasHeight = ass.length * yIndex + 10;

var canvas = createHiDPICanvas(600, canvasHeight, 1);
document.body.appendChild(canvas);
var context = canvas.getContext("2d");

context.font = "1rem Georgia";
context.fillStyle = "blue";
console.log("canvas height", canvasHeight);

var kk = [];
var size = 0;
var y = 0;
for (var i = 0; i < ass.length; i++) {
  var line = ass[i];
  kk.push(line);
  y += yIndex;
  let check = filterKeywords(line);
  console.log(check);
  texter(line,0,y)
  // console.log(line);
  // if(line.indexOf("var") != -1){
  //   texter(line, 0, y, "var");
  // } else if(line.indexOf("function") != -1){
  //   texter(line, 0, y, "function");
  // } else {
  //   texter(line, 0, y, undefined);
  // }
  
  
  if (line.length > size) {
    size = line.length;
  }
}
function filterKeywords(str){
    var indexVar = str.match(/var/);
    if(indexVar != null){
      var infoVar = indexVar;
      var placeInStr = infoVar.index;
      return [placeInStr,infoVar[0],infoVar[0].length];
    }
}

var endStr = kk.join("\n");

for (var i = 0; i < endStr.length; i++) {}
function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}
var colorObj = {};
function texter(str, x, y, reg) {
    if(reg != undefined){
        var len = reg.length;
        var regTerm = new RegExp(`${reg}`);
        var indexOfVar = str.search(regTerm);
    }
  // nova funkcija koja vraca parametre kao objekat,niz
  // Uzimanje brojeva, stringova ?!?
  
  for (var i = 0; i <= str.length; ++i) {
    var ch = str.charAt(i);
    if (i == indexOfVar) {
      for (var j = 0; j < len; j++) {
        console.log("prvo i", i, "index Var", indexOfVar, "karakter", ch);
        ch = str.charAt(i + j);
        if (reg === "var") {
          console.log("crveno");
          context.fillStyle = "#569cd6";
        } else if(reg === "function"){
          context.fillStyle = "purple";
        }
        context.fillText(ch, x, y);
        x += context.measureText(ch).width;
        console.log("drugo i", i);
      }
      i += len - 1;
    } else {
        if(ch == "="){
            context.fillStyle = "gray";
        } else {
            context.fillStyle = "#9cdcfe";
        }
      
      context.fillText(ch, x, y);
      x += context.measureText(ch).width;
    }
    //context.fillStyle = "red";
  }
}


var str = `var kme = 23;var kme1 = 32;var kme2 = 12;
var kme = 23;var kme1 = 32;var kme2 = 12;var kme = 23;var kme1 = 32;var kme2 = 12;
var kme = 23;var kme1 = 32;var kme2 = 12;var kme = 23;var kme1 = 32;var kme2 = 12;
var kme = 23;var kme1 = 32;var kme2 = 12;var kme = 23;var kme1 = 32;var kme2 = 12;
var kme = 23;var kme1 = 32;var kme2 = 12;
`;
function chunkString(str, n) {
  return str.match(new RegExp("(.|[\r\n]){1," + n + "}", "g"));
}
var str2 = chunkString(str, 20);

function getValues(obj) {
  var tmp = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      tmp.push(obj[key]);
    }
  }
  return tmp;
}

var values = getValues(names[0]);

function makeRegex(regVals) {
  var tmp = "";
  for (var i = 0; i < regVals.length; i++) {
    tmp += `\\b${regVals[i]}\\b`;
    if (i != regVals.length - 1) {
      tmp += "|";
    }
  }
  return tmp;
}
var regex = makeRegex(values);

var reg = new RegExp(regex, "g");

var kkk = str.search("var");
str = str.replace(/var/g, (match, offset, string) => {
  return "var";
});
