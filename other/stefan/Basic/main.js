let jsPatterns = [
    `
var a = 1;
var b = 2;
function sum(x, y) {
    return x + y
};
console.log(sum(a, b), 2);
console.log(sum(a, b));
    `
];

let result = "";
function logResult(...params) {
    result += params.join(" ") + "\n";
}

let jScript = jsPatterns[0];
let jScriptOriginal = jScript;

jScript = jScript.replace(/console.log/g, "logResult");
jScript += "return result";

let finalFunction = new Function(jScript)

console.log(jScriptOriginal);
console.log(finalFunction());





















