function rand(min, max) {
     return Math.floor(Math.random()*(max-min+1)+min);
}

let vars = [
    {
        "a": "a",
        "b": "b",
        "c": "c",
        "d": "d",
        "e": "e",
        "f": "f",
        "g": "g",
        "h": "aa",
        "i": "bb"
    },
    {
        "a": "b",
        "b": "a",
        "c": "d",
        "d": "c",
        "e": "f",
        "f": "e",
        "g": "i",
        "h": "j",
        "i": "k"
    },
    {
        "a": "lorem",
        "b": "ipsum",
        "c": "dolor",
        "d": "sit",
        "e": "amet",
        "f": "consequentum",
        "g": "rubor",
        "h": "calor",
        "i": "bar"
    },
    {
        "a": "prvi",
        "b": "drugi",
        "c": "treci",
        "d": "cetvrti",
        "e": "peti",
        "f": "sesti",
        "g": "sedmi",
        "h": "osmi",
        "i": "deveti",
    },
    {
        "a": "alfa",
        "b": "beta",
        "c": "gama",
        "d": "delta",
        "e": "jota",
        "f": "teta",
        "g": "zeta",
        "h": "sigma",
        "i": "omega",
    }
];
let varNames = vars[rand(0, vars.length - 1)];
let randomNumbers = [];
for (let i = 0; i < 8; i++) {
    randomNumbers.push(rand(0, 50));
}
// todo - shuffle "e"
let fake = [7, 100, 4, 5, 6]; // not implemented
let varRand = [];
for (let i = 0; i < 100; i++) {
    varRand[i] = rand(0, 1) === 1 ? 'var ' : '';
}

console.log(varNames);

let rands = {
    "callRandomA": rand(0, 1) ? '()' : '',
    "callRandomB": rand(0, 1) ? '()' : '',
    "stringRandomA": rand(0, 1) ? '"' : '',
    "stringRandomB": rand(0, 1) ? '"' : '',
    "numberRandomA": rand(0, 10),
    "numberRandomB": rand(10, 15),
    "numberRandomC": rand(22, 33),
    "propRandomA": rand(0, 1) ? `${varNames.e}:${varNames.d},\n        ` : '',
    "propRandomB": rand(0, 1) ? `${varNames.a}:${varNames.a},\n        ` : '',
    "propRandomC": rand(0, 1) ? `${varNames.b}:${varNames.b},\n        ` : '',
    "propRandomD": rand(0, 1) ? `${varNames.c}:${varNames.d},\n        ` : '',
};

rands["a2_7"] = rands['propRandomB'] === '' ? '' : `log("${varNames.c}.${varNames.a}",${varNames.c}.${varNames.a}() );\n`;
rands["a2_8"] = rands['propRandomC'] === '' ? '' : `log("${varNames.c}.${varNames.b}",${varNames.c}.${varNames.b}() );
`;
rands["a2_9"] = rands['propRandomD'] === '' ? '' : `log("${varNames.c}.${varNames.c}",${varNames.c}.${varNames.c} );\n`;
rands["numberRandomB"] = rands['propRandomA'] === '' ? '' : `log("${varNames.c}.${varNames.e}",${varNames.c}.${varNames.e} )\n`;


let jss = [
    `

var $a = ${randomNumbers[0]};
var $b = ${randomNumbers[1]};
var $c= (function() {
    $a = ${randomNumbers[2]};//#varRand1
    $b = ${randomNumbers[3]};//#varRand1
    log("$a", $a, "$b", $b);
    var $g=$d()[0]${rands.a0FCall};
    log("$a", $a, "$b", $b);
    function $d() {
        $a = ${randomNumbers[4]};//#varRand2
        $b = ${randomNumbers[5]};//#varRand3
        log("$a", $a, "$b", $b);
        return [function() {
            ${varRand[4]}$a = ${randomNumbers[6]};
            ${varRand[5]}$b = ${randomNumbers[7]};
            log("$a", $a, "$b", $b);
        }];
    }

    return $d();
})();


`
    ,
    `
var $a = ${randomNumbers[0]};
var $b = ${randomNumbers[1]};
var $c= (function() {
    ${varRand[0]}$a = ${randomNumbers[2]};
    ${varRand[1]}$b = ${randomNumbers[3]};
    var $c=$d;
    log("$a", $a, "$b", $b);
    function $d() {
        ${varRand[2]}$a = ${randomNumbers[4]};
        ${varRand[3]}$b = ${randomNumbers[5]};
        log("$a", $a, "$b", $b);
        return $a;
    }
    
    var $g=function(){
        return $b;
    }

    return {
        $g:$g,
        $c:$c,
        $b:${rands.stringRandomA}$a${rands.stringRandomA},
        $a:${rands.stringRandomB}$a${rands.stringRandomB}
    };
})();
$b=$c.$c();
$a=$c.$g();
log("$a", $a, "$b", $b);
log("$c.$a",$c.$a, "$c.$b",$c.$b);

`
    ,
    `

var $a = ${randomNumbers[0]};
var $b = ${randomNumbers[1]};
var $c= (function() {
    var $d=${rands.numberRandomA};
    var $e="${rands.numberRandomB}";
    function $a(){
        return ${rands.numberRandomA};
    }
    
    function $b(){
        return ${rands.numberRandomB};
    }
    
    function $c(){
        return ${rands.numberRandomC};
    }

    return {
        ${rands.propRandomA}${rands.propRandomB}${rands.propRandomC}${rands.propRandomD}}
    
})();

${rands.a2_7}${rands.a2_8}${rands.a2_9}${rands.numberRandomB}


`
    ,
    `

var $a = ${randomNumbers[0]};
var $b = ${randomNumbers[1]};
var $c= (function() {
    var $b = ${randomNumbers[2]};
    $d()();
    log("$a", $a, "$b", $b);
    function $d() {
        var $b = ${randomNumbers[3]};
        log("$a", $a, "$b", $b);
        return function() {
            var $b = ${randomNumbers[4]};
            log("$a", $a, "$b", $b);
        };
    }

    return $d();
})();

`
    ,
    `

var $a = ${randomNumbers[0]};
var $b = ${randomNumbers[1]};
var $c= (function() {
    var $b = ${randomNumbers[2]};
    $d()();
    log("$a", $a, "$b", $b);
    function $d() {
        var $b = ${randomNumbers[3]};
        log("$a", $a, "$b", $b);
        return function() {
            var $b = ${randomNumbers[4]};
            log("$a", $a, "$b", $b);
        };
    }

    return $d();
})();

`

,
`
var $a = ${rands.stringRandomA}${randomNumbers[0]}${rands.stringRandomA};
var $b = ${rands.stringRandomB}${randomNumbers[1]}${rands.stringRandomB};
function sum(x, y) {
    return x + y
};
log(sum($a, $b));
log(parseInt(sum($a, $b)) - ${rands.numberRandomA});

`

];
//let js = jss[rand(0, 2)];// $jss[rand(0, count($jss))];
let js = jss[5];// $jss[rand(0, count($jss))];

js = js.replace(/\$([a-z]+)/g, (match, p1, offset, string) => {
    console.log(p1);
    return varNames[p1]
});
// console.log('m',match,'p1',p1,'p2',offset);


let js_orig = `\n${js}\n`;
js = `var msg='',
log=function(...a){
    msg += a.join(' ')+'\\n';
}


${js}

return msg;
`;
console.log(js);
var resenje = new Function(js)();
console.log('Rešenje', resenje);

if (typeof document != 'undefined') document.body.innerHTML = `<hr><pre>${js_orig}</pre><hr>
<pre>${resenje}</pre>
`;

/*
$rand         = md5($js_orig);
$js_file      = __DIR__ . "/js_full/$rand.js";
$js_orig_file = __DIR__ . "/js/$rand.js";
file_put_contents($js_orig_file, $js_orig);
file_put_contents($js_file, $js);
exec("node $js_file 2>&1", $out, $err);
#$rand=rand(0,1e9);
$solution = "\n" . implode("\n", $out);
file_put_contents(__DIR__ . "/solutions/$rand.txt", $solution);
file_get_contents("http://$_SERVER[HTTP_HOST]/img.php?file=$rand&code=" . urlencode($js_orig));
echo "<img src='imgs/$rand.png'>";
*/


