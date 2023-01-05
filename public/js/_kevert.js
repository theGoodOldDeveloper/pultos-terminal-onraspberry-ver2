var lastTransaction = -1;
// NOTE: Ez definiálja a bekért //ok ojektum tömbjét 😎
const state = {
    kevert: [],
    termekek: [],
    xkimeresnev: [],
};

var xid = 1;
var adalekokHTML = "";
var termekAdalek = [];
var kiszerelesAdalek = [];

getdata();
//async function getkevert() {
/* NOTE: get kevert */
/*var response = await fetch("/datareadkevert");
    state.kevert = await response.json();
} */
//async function gettermekek() {
/* NOTE: get keszlet INFO: INFO: INFO:*/
/* var response = await fetch("/datareadtermekek");
    state.termekek = await response.json();
} */
/* INFO: termék //ok bekérése START INFO: */
async function getdata() {
    /* NOTE: get last-transaction */
    var response = await fetch("/lasttransaction");
    state.lastTransaction = await response.json();
    console.log("lastTransaction 😎");
    console.log(state.lastTransaction[0].ltr);

    /* NOTE: get kevert */
    var response = await fetch("/datareadkevert");
    state.kevert = await response.json();

    /* NOTE: get keszlet INFO: INFO: INFO:*/
    var response = await fetch("/datareadtermekek");
    state.termekek = await response.json();

    /* NOTE: get csoport INFO: INFO: INFO:*/
    /* var response = await fetch("/datareadcsoport");
    state.csoportkategoria = await response.json(); */

    /* NOTE: get xkimeres INFO: INFO: INFO:*/
    /* var response = await fetch("/datareadxkimeres");
    state.xkimeres = await response.json();
 */
    /* NOTE: get xkimeresnev INFO: INFO: INFO:*/
    var response = await fetch("/datareadxkimeresnev");
    state.xkimeresnev = await response.json();

    renderkevert();
    /* NOTE: NOTE: NOTE: NOTE: NOTE: NOTE: NOTE: NOTE: NOTE: NOTE: NOTE: */

    $(document).ready(function () {
        $("#newdata").click(function () {
            insertMySQL();

            async function insertMySQL() {
                /* HACK:HACK:HACK: */
                const nevInput = document.querySelector("#nev");
                const nev = nevInput.value == "" ? "noname" : nevInput.value;
                nevInput.value = "";
                /* HACK:HACK:HACK: */
                var beszar = 0;
                var elar = 0;
                let arrayIndexTermek = -1;
                let arrayIndexXkimeresnev = -1;
                for (let index = 0; index < termekAdalek.length; index++) {
                    for (let i = 0; i < state.termekek.length; i++) {
                        if (termekAdalek[index] == state.termekek[i].id) {
                            arrayIndexTermek = i;
                        }
                    }
                    for (let i = 0; i < state.xkimeresnev.length; i++) {
                        if (
                            kiszerelesAdalek[index] == state.xkimeresnev[i].id
                        ) {
                            arrayIndexXkimeresnev = i;
                        }
                    }
                    beszar += Math.round(
                        (state.termekek[arrayIndexTermek].beszar /
                            state.termekek[arrayIndexTermek].cl) *
                            state.xkimeresnev[arrayIndexXkimeresnev].urtartalom
                    );
                    elar += Math.round(
                        (state.termekek[arrayIndexTermek].elar /
                            state.termekek[arrayIndexTermek].cl) *
                            state.xkimeresnev[arrayIndexXkimeresnev].urtartalom
                    );
                }
                /* HACK:HACK:HACK: */
                var id = xid + 1;
                /* INFO: insert  INFO: INFO: INFO: INFO: INFO: INFO: INFO:*/
                await fetch("/inserttermekek/", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        /* TODO: NOTE: INFO: NOTE: TODO: */
                        nev: nev,
                        beszar: beszar,
                        elar: elar,
                        leltarozando: "n",
                        kritikus: 0,
                        gyujto: 0,
                        jelenlegiKeszlet: 0,
                        urtartalom: 0,
                        cl: 0,
                        sumcl: 0,
                        kiszerelesId: 1,
                        csoportId: 1,

                        /* TODO: NOTE: INFO: NOTE: TODO: */
                    }),
                });

                //gettermekek();
                console.log(state.termekek);

                var ucsoId = state.termekek[state.termekek.length - 1].id + 1;
                /* INFO: /insertkevert START  INFO: INFO: INFO: INFO: INFO: INFO: INFO:*/

                for (let index = 0; index < termekAdalek.length; index++) {
                    await fetch("/insertkevert/", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            termek_id: ucsoId,
                            adalek_id: termekAdalek[index],
                            xkimeresnev_id: kiszerelesAdalek[index],
                        }),
                    });
                }
                termekAdalek = [];
                kiszerelesAdalek = [];

                /* INFO: /insertkevert END INFO: INFO: INFO: INFO: INFO: INFO: INFO:*/

                /* INFO: insert  INFO: INFO: INFO: INFO: INFO: INFO: INFO:*/
                /* kevertHTML += `<tr >
                <td>${id}</td>
                <td>${nev}</td>
                <td>${urtartalom}</td>
                </tr>
                `; */
                id++;
                xid++;
                document.getElementById("kevert").innerHTML = kevertHTML;
                //.then((response) => response.json())
                //.then((data) => console.log(data["data"]));
                /* .then((data) => insertRowIntoTable(data["data"])); */
            }
            //window.onload = renderkevert();
            //termekAdalek = [];
            //kiszerelesAdalek = [];
            adalekokHTML = "";
            document.getElementById("newVadasz").innerHTML = adalekokHTML;
            renderkevert();
        });
    });

    //getkevert();
    //renderkevert();
    //window.onload = renderkevert();
}

function renderkevert() {
    let index = 0;
    kevertHTML = "";
    keresettId = -1;
    keresettAdalekId = -1;
    keresettXkimeresNevId = -1;
    //console.log(state.kevert[0].nev);
    for (let vkevert of state.kevert) {
        for (let index = 0; index < state.termekek.length; index++) {
            if (vkevert.termek_id == state.termekek[index].id) {
                keresettId = index;
                break;
            }
        }
        for (let index = 0; index < state.termekek.length; index++) {
            if (vkevert.adalek_id == state.termekek[index].id) {
                keresettAdalekId = index;
                break;
            }
        }
        for (let index = 0; index < state.xkimeresnev.length; index++) {
            if (vkevert.xkimeresnev_id == state.xkimeresnev[index].id) {
                keresettXkimeresNevId = index;
                break;
            }
        }

        let tempNev = state.termekek[keresettId].nev;
        kevertHTML += `
                <tr>
                <td>${vkevert.termek_id}</td>
                <td>${state.termekek[keresettId].nev}</td>
                <td>${vkevert.adalek_id}</td>
                <td>${state.termekek[keresettAdalekId].nev}</td>
                <td>${vkevert.xkimeresnev_id}</td>
                <td>${state.xkimeresnev[keresettXkimeresNevId].nev}</td>
                </tr>
                
     `;
        index++;
        xid = vkevert.id; /* BUG: */
    }
    document.getElementById("kevert").innerHTML = kevertHTML;
}
/* keszlet: [],
    csoportkategoria: [],
    xkimeres: [],
    lastTransaction: [],
    xkimeresnev: [], */

function adalekPlus() {
    //adalekokHTML = "";
    //termekAdalek = [];
    //kiszerelesAdalek = [];
    kimertTermekekHTML = "";
    $("#myModalTermekek").modal();
    for (let index = 0; index < state.termekek.length; index++) {
        if (state.termekek[index].kiszereles_id == 2) {
            kimertTermekekHTML += `<div class = "card m-3 adalek" id=${state.termekek[index].id}><h5>${state.termekek[index].nev}</h5></div>`;
        }
    }
    document.getElementById("kimertTermekek").innerHTML = kimertTermekekHTML;
    $(".adalek").click(function () {
        for (let index = 0; index < state.termekek.length; index++) {
            if (state.termekek[index].id == this.id) {
                adalekokHTML += `<div>${state.termekek[index].nev} -> `;
                break;
            }
        }
        termekAdalek.push(this.id); //HACK:HACK:HACK:
        $(".modal .close").click();
        kimertKiszerelesHTML = ""; //NOTE:NOTE:
        $("#myModalKiszereles").modal();
        for (let index = 0; index < state.xkimeresnev.length; index++) {
            //if (state.xkimeresnev[index].kiszereles_id == 2)
            kimertKiszerelesHTML += `<div class = "card m-3 kiszereles" id=${state.xkimeresnev[index].id}><h1>${state.xkimeresnev[index].nev}</h1></div>`;
        }
        document.getElementById("kimertKiszereles").innerHTML =
            kimertKiszerelesHTML;
        $(".kiszereles").click(function () {
            for (let index = 0; index < state.xkimeresnev.length; index++) {
                if (state.xkimeresnev[index].id == this.id) {
                    adalekokHTML += `${state.xkimeresnev[index].nev}</div>`;
                    break;
                }
            }
            kiszerelesAdalek.push(this.id); //HACK:HACK:HACK:
            $(".modal .close").click();
            //NOTE:NOTE: mi legyen ha megvan a NOTE:NOTE:
            document.getElementById("newVadasz").innerHTML = adalekokHTML;
            console.log(termekAdalek);
            console.log(kiszerelesAdalek);
            console.log();
        });
    });
}
//window.onload = renderkevert();
