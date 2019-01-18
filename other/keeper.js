// helper

// globalne promenljive
let keys,
    selectedKeys;

// 
let r = {
    n: "$",
    v: "$"
}

// imena varijabli
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
        d: "fourth"
    }
]

// paterni za za zadatke
let jsPatterns = [
    `
var $a = $-${rN()};
var $b = $-${rN()};
var $c = $-${rN()};
var $d = $2"6$2";
function sum(x, y) {
    $var $c = $-${rN()};
    return x $+ y $+ $c
};
function message() {
    console.log("this is a message")
}
console.log(sum($a, $b) $+ $c);
console.log(sum($a, $b) + $d);
$b = message$();
    `
];

// funkcija za cuvanje rezultata
let result = "";
function logResult(...params) {
    result += params.join(" ") + "\n";
}

// dodela paterna
let jScript = jsPatterns[0];

/////////// obrada paterna /////////////////////+

//poziv funkcije on/off
jScript = jScript.replace(/\$(\(\))/g, (match, p1, offset, string) => {
    return (random(0,1) === 1) ? "()" : ""
});

//navodnici on/off
keys = {};
jScript = jScript.replace(/\$([0-9]\")/g, (match, p1, offset, string) => {
    let properties = Object.keys(keys);
    if (properties.indexOf(p1) === -1) {
        let key = (random(0,1) === 1) ? "" : "\""
        keys[p1] = key;
        return key
    } else {
        return keys[p1]
    }
});

//brojevi negativni/pozitivni
jScript = jScript.replace(/\$(\-)/g, (match, p1, offset, string) => {
    return (random(0,1) === 1) ? "" : "-"
});
jScript = jScript.replace(/(\-0)/g, (match, p1, offset, string) => {
    return 0
});

//znakovi +/-
jScript = jScript.replace(/\$(\+)/g, (match, p1, offset, string) => {
    return (random(0,1) === 1) ? "+" : "-"
});


//var off/on
jScript = jScript.replace(/\$(var\s)/g, (match, p1, offset, string) => {
    return (random(0,1) === 1) ? "" : "var "
});

//imena varijabli
keys = objectProperties(variableNames[1]);
selectedKeys = {};
jScript = jScript.replace(/\$([a-z])/g, (match, p1, offset, string) => {
    let properties = objectProperties(selectedKeys);
    if (properties.indexOf(p1) === -1) {
        key = keys.splice(random(0, keys.length - 1), 1)[0];
        selectedKeys[p1] = variableNames[1][key];
        return variableNames[1][key]
    } else {
        return selectedKeys[p1]
    }
});

// obradjeni patern za prikaz korisniku
let jScriptOriginal = jScript;

// dodela return-a
jScript = jScript.replace(/console.log/g, "logResult");
jScript += "return result";

// kreiranje funkcije
let finalFunction = new Function(jScript)

//prikaz rezultata i paterna za korisnika
console.log(jScriptOriginal);
console.log(finalFunction());




















