// ###### primer 1 
var lorem = 7;
var ipsum = 100;
var dolor= (function() {
    lorem = 4;
    ipsum = 5;
    log("lorem", lorem, "ipsum", ipsum);
    var rubor=sit()[0]();//★ sit - treba da bude promenljiva
    log("lorem", lorem, "ipsum", ipsum);
    function sit() {
        lorem = 6; // lorem nekad ima var a nekad ne
        ipsum = 12;// vrednost 12 je promenljiva
        log("lorem", lorem, "ipsum", ipsum);
        return [function() {// ceo blok sa return treba da: a) bude opcion b) da se vuče iz liste custom zamena za njega, c) da može da zameni mesto sa nekim drugim blokom
            var lorem = 9;
            var ipsum = 8;
            log("lorem", lorem, "ipsum", ipsum);
        }];
    }

    return sit();
})();

// ###### primer 2

function meni(poruka) {
    if (!poruka) {
        poruka = "Dobro došli";
    }
    var odgovor = prompt(poruka + "\nIzaberite broj iz menija da biste nastavili:\n" +
        "0 - da se vratite na početak\n" +
        "1 - promeni boju pozadine\n" +
        "2 - vrati random broj\n" +
        "3 - izlaz\n"
    );
    if (odgovor == 0) {// redosled svih if, else if blokova može da bude random (ne i zadnjeg else bloka)
        meni();
    } else if (odgovor == 1) {
        var boje = ['red', 'green', 'blue', 'yellow', 'olive'];
        var randomBoja = boje[Math.floor(Math.random() * boje.length)];// nekad ispisuje random(boje.length) nekad ovaj kod (inline function)
        document.body.style.background = randomBoja;
        var kodZaZbunjivanje; // blok koda koji ne radi ništa
        kodZaZbunjivanje*=7;
        meni("Boja pozadine promenjena u: " + randomBoja);
    } else if (odgovor == 2) {
        meni("Random broj: " + Math.floor(Math.random() * 100));
    } else if (odgovor == 3) {
        console.log("Izlaz");
    } else {
        meni("Izabrali ste pogrešan unos!!!");
    }
}

meni();
// ###### primer 3

var a=5;// var a i var c mogu da zamene mesta
var b=7;
var c=9;

console.log('ovo je 5',5); // umesto 5 upiši random blok koda koji vraća broj 5 (npr. 2+3 ili Math.sqrt(25))

// ###### primer 4
var niz=[2,9,15,23];// funkcija koja menja redosled elemenata u nizu






