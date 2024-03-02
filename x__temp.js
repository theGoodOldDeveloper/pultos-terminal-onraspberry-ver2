//HACK             OOOOOOOKKKKKKKK                //
//HACK             state.kosarak listener                //
$(".termekButton").click(function () {
  if (beforStateGroceryValue != state.kosarak.length) {
    console.log("Termek gombra nyomva lett");
    console.log("state.kosarak", state.kosarak);
    console.log("state.kosarak.length", state.kosarak.length);
    console.log("beforStateGroceryValue", beforStateGroceryValue);
    beforStateGroceryValue = state.kosarak.length;
    kosarakTest();
  } else {
    console.log("state.kosarak.length", state.kosarak.length);
    console.log("beforStateGroceryValue", beforStateGroceryValue);
    kosarakTest();
  }
});
function kosarakTest() {
  console.log("kosarakTest lefutott !!!!! 😈😈😈😈😈");
}
//HACK             state.kosarak listener                //
//HACK             state.kosarak listener                //
//HACK             state.kosarak listener                //
//HACK             state.kosarak listener                //
// Vegyük fel, hogy van egy state objektum, amiben a kosarakat tároljuk

// Definiáljuk a kosarakTest() funkciót, amit akkor hajtunk végre, ha a kosarak értéke megváltozik
function kosarakTest() {
  console.log("A kosarak értéke megváltozott!");
  console.log("A kosarak tartalma: " + stateProxy.kosarak.length);
  // Ide írhatod a további műveleteket vagy logikát
}

// Hozz létre egy Proxy-t a state objektumhoz, hogy figyeljük a változásokat
const stateProxy = new Proxy(state, {
  set(target, property, value) {
    // Először állítsd be az értéket a state objektumban
    target[property] = value;
    // Majd hajtsd végre a kosarakTest() funkciót
    kosarakTest();
    return true;
  },
});

// Most állítsuk be a kosarak értékét
stateProxy.kosarak = [...state.kosarak]; // Ez meghívja a kosarakTest() funkciót

// Most változtassuk meg a kosarak értékét
//stateProxy.kosarak.push('barack'); // Ez is meghívja a kosarakTest() funkciót

//HACK             state.kosarak listener                //
//HACK             state.kosarak listener                //
stateProxy.kosarak = [...state.kosarak];
//HACK             state.kosarak listener                //
//HACK             state.kosarak listener                //
//HACK             state.kosarak listener                //
function kosarakTest() {
  console.log("kosarakTest lefutott !!!!! 😈😈😈😈😈");
}
const kosarValtozottEvent = new Event("kosarValtozott");
document.dispatchEvent(kosarValtozottEvent);
document.addEventListener("kosarValtozottEvent", kosarakTest());
/* document.addEventListener("kosarValtozottEvent", kosarakTarol); */
//HACK             state.kosarak listener                //

const state = {
  kosar: [],
};

const kosarValtozottEsemény = new CustomEvent("kosarValtozott");

function kosarakMent() {
  // ... A kosarak mentése a háttértárba ...
  console.log("A kosarak mentve lettek!");
}

// Kosár módosítása
state.kosar.push({
  nev: "Termék 1",
  ar: 1000,
});

document.dispatchEvent(kosarValtozottEsemény);

// Feliratkozás a kosár változására
document.addEventListener("kosarValtozott", kosarakMent);
//HACK             state.kosarak listener                //
const state = {
  kosar: [],
};

const proxy = new Proxy(state.kosar, {
  set: function (target, property, value) {
    target[property] = value;
    kosarakMent(); // A kosarakMent() függvény meghívása
  },
});

function kosarakMent() {
  // ... A kosarak mentése a háttértárba ...
  console.log("A kosarak mentve lettek!");
}

// Kosár módosítása
proxy.push({
  nev: "Termék 1",
  ar: 1000,
});

// A konzol kiírja: "A kosarak mentve lettek!"

//HACK             state.kosarak listener                //
