// globalne promenljive
let keys,
    selectedKeys;

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
];

// paterni za za zadatke
let jsPatterns = [
    {
        string: `    var $a = $N;
    var $b = $N;
    var $c = $N;
    var $d = $"6$";
    function sum(x, y) {
        $var $c = $N;
        return x $+ y $+ $c
    };
    function message() {
        console.log("this is a message")
    }
    console.log(sum($a, $b) $+ $c);
    console.log(sum($X, $X));
    $b = message$();
        `,
        vars: ["$a", "$b", "$c", "$d"]
    }
];

// funkcija za cuvanje rezultata
let result = "";
function logResult(...params) {
    result += params.join(" ") + "\n";
}

// dodela paterna
let jScript = jsPatterns[0].string;

/////////// obrada paterna /////////////////////

//random varijable
jScript = jScript.replace(/\$(X)/g, (match, p1, offset, string) => {
    return jsPatterns[0].vars[randomNumber(0, jsPatterns[0].vars.length - 1)]
});

//random broj
jScript = jScript.replace(/\$(N)/g, (match, p1, offset, string) => {
    return randomNumber(-5, 10)
});


//poziv funkcije on/off
jScript = jScript.replace(/\$(\(\))/g, (match, p1, offset, string) => {
    return (randomNumber(0, 1) === 1) ? "()" : ""
});

//navodnici on/off
keys = {};
let x = 1;
jScript = jScript.replace(/\$(\")/g, (match, p1, offset, string) => {
    if (x === 1) {
        x = (randomNumber(0, 1) === 1) ? "" : "\""
        return x
    } else if (x === "") {
        x = 1;
        return ""
    } else if (x === "\"") {
        x = 1;
        return "\""
    }
});

//znakovi +/-
jScript = jScript.replace(/\$(\+)/g, (match, p1, offset, string) => {
    return (randomNumber(0, 1) === 1) ? "+" : "-"
});


//var off/on
jScript = jScript.replace(/\$(var\s)/g, (match, p1, offset, string) => {
    return (randomNumber(0, 1) === 1) ? "" : "var "
});

//imena varijabli
keys = objectProperties(variableNames[1]);
selectedKeys = {};
jScript = jScript.replace(/\$([a-z])/g, (match, p1, offset, string) => {
    let properties = objectProperties(selectedKeys);
    if (properties.indexOf(p1) === -1) {
        key = keys.splice(randomNumber(0, keys.length - 1), 1)[0];
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
let finalFunction = new Function(jScript);

//prikaz rezultata i paterna za korisnika
console.log(jScriptOriginal);
console.log(finalFunction());




















