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
var y = 0;
var yIndex = 15;
var canvasHeight = ass.length * yIndex + 10;

// canvas init
var canvas = createHiDPICanvas(600, canvasHeight, 1);
document.body.appendChild(canvas);
var context = canvas.getContext("2d");
context.font = "1.1rem Georgia";
context.fillStyle = "blue";



function colorCanvas(assigment, ySpacing) {
  ass = assigment.split("\n");
  
  for (var k = 0; k < ass.length; k++) {
    var line = ass[k];
    console.log(line);
    texterBlue(line, 0, y);
    y += yIndex;
  }
}
colorCanvas(ass);


function texterBlue(str, x, y) {
  var indexes = getAllIndexes(str, ["var", "function"]);
  var final = removeEmptyObj(indexes);

  if (final != undefined) {
    var startAt = final[0].index;
    var range = final[0].len;
    if (final[1] != undefined) {
      var startAt2 = final[1].index;
    }
  }

  for (var i = 0; i < str.length; i++) {
    var ch = str.charAt(i);
    if (i === startAt) {
      for (var j = 0; j < range; j++) {
        ch = str.charAt(i + j);
        colorFillChange(ch, x, y, "#832cd6");
        x += context.measureText(ch).width;
      }
      i += final[0].len - 1;
      if (final[1] != undefined) {
        range = final[1].len;
      }
    } else if (i === startAt2) {
      for (var j = 0; j < range; j++) {
        ch = str.charAt(i + j);
        colorFillChange(ch, x, y, "#932cd6");
        x += context.measureText(ch).width;
      }
      i += final[1].len - 1;
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
      console.log(i, val[k]);
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

var str = `var kme = 23;var kme1 = 32;var kme2 = 12;
  var kme = 23;var kme1 = 32;var kme2 = 12;var kme = 23;var kme1 = 32;var kme2 = 12;
  var kme = 23;var kme1 = 32;var kme2 = 12;var kme = 23;var kme1 = 32;var kme2 = 12;
  var kme = 23;var kme1 = 32;var kme2 = 12;var kme = 23;var kme1 = 32;var kme2 = 12;
  var kme = 23;var kme1 = 32;var kme2 = 12;
  `;
