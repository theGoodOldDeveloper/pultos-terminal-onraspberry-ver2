const state = {
    forgalom: [],
    termekek: [],
    alapanyagok: [],
    osszetevok: [],
};

var xid = 1;
var origId = -1;

var startFilterDate = maiDatum();
var endFilterDate = "2099. 12. 31.";
console.log(startFilterDate, endFilterDate)
var termekNev = []
var termekDB = []
var forgalomHOUR = []
var alapanyagFogyas = []
getdata();

/* INFO: forgalom adatok bekérése START INFO: */
async function getdata() {
    /* NOTE: get forgalom INFO: INFO: INFO:*/
    var response = await fetch("/datareadforgalom");
    state.forgalom = await response.json();
    var response = await fetch("/datareadtermekek");
    state.termekek = await response.json();
    for (termek of state.termekek) {
        termekNev[termek.id] = termek.nev
        termekDB[termek.id] = 0

    }
    var response = await fetch("/datareadalapanyagok");
    state.alapanyagok = await response.json();
    var response = await fetch("/datareadosszetevok");
    state.osszetevok = await response.json();
    //startFilterDate = maiDatum()

    renderforgalom();
}

document.addEventListener("keypress", function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
    }
});

//BUG:BUG:BUG:BUG:BUG:BUG:BUG:
function renderforgalom() {
    let index = 0;
    forgalomHTML = "";
    forgalomDBHTML = "";
    forgalomALAPANYAGOKHTML = "";
    forgalomHOURHTML = "";
    let hour = 0
    let haszon = -1
    init()
    for (let vForgalom of state.forgalom) {

        if (
            vForgalom.eladottdate >= startFilterDate &&
            vForgalom.eladottdate <= endFilterDate
        ) {
            termekDB[vForgalom.termekid] += vForgalom.db
            haszon = Math.round(vForgalom.db * (vForgalom.eladottelar - vForgalom.eladottbeszar))
            forgalomHTML += `<tr >
        <td>${vForgalom.id}</td><td>${vForgalom.transaction_id}</td><td>${termekNev[vForgalom.termekid]}</td><td>${vForgalom.db}</td><td>${vForgalom.eladottbeszar}</td><td>${vForgalom.eladottelar}</td><td>${haszon}</td><td>${vForgalom.eladottdate}</td>
        </tr>
        `;

            hour = new Date(vForgalom.eladottdate)
            hour = hour.getHours()
            forgalomHOUR[hour] += vForgalom.eladottelar * vForgalom.db
            /* forgalomHTML += `<tr >
        <td>${vForgalom.id}</td><td>${vForgalom.transaction_id}</td><td>${termekNev[vForgalom.termekid]}</td><td>${vForgalom.db}</td><td>${vForgalom.eladottbeszar}</td><td>${vForgalom.eladottelar}</td><td>${vForgalom.eladottdate}</td><td>${vForgalom.transaction_id}</td>
        <td><button class="updateBtn" id=${vForgalom.xkimeresnevid}>Edit</td>
        </tr>
        `; */
            //VERSION-2:
            //console.log(vForgalom.termekid)

            for (osszetevo of state.osszetevok) {
                if (osszetevo.termek_id == vForgalom.termekid) {
                    alapanyagFogyas[osszetevo.alapanyag_id] += osszetevo.felhasznaltmennyiseg * vForgalom.db
                }
            }
            //VERSION-2:
        }

        index++;
        xid = vForgalom.id;
    }
    for (hour = 0; hour < 24; hour++) {
        if (hour == 0 || hour == 4 || hour == 8 || hour == 12 || hour == 16 || hour == 20) {
            forgalomHOURHTML += `<tr >`
        }
        forgalomHOURHTML += `
        <td class="text-right"><kbd>${hour} - ${hour + 1}</kbd><td class="text-left">${(forgalomHOUR[hour]).toLocaleString("hu-HU", {
            maximumFractionDigits: 0,
        })}</td><td class="bg-success"></td>  
`
        if (hour == 3 || hour == 7 || hour == 11 || hour == 15 || hour == 19 || hour == 23) {
            forgalomHOURHTML += `</tr>`
        }
    }
    forgalomHOURHTML += `<br><br>`


    document.getElementById("forgalomdata").innerHTML = forgalomHTML;
    /* console.log('termekDB')
    console.log(termekDB) */
    for (termek of state.termekek) {
        if (termekDB[termek.id] > 0) {
            forgalomDBHTML += `<tr >
            <td>${termek.nev}</td><td class="text-left">${termekDB[termek.id]}</td>
            </tr>`
            //console.log(termek.nev + termekDB)

        }
    }
    forgalomALAPANYAGOKHTML = ''
    let me = ''
    for (alapanyag of state.alapanyagok) {
        if (alapanyagFogyas[alapanyag.id] > 0 && alapanyag.leltarozando == 1) {
            if (alapanyag.mertekegyseg == 'liter') {
                me = 'liter'
                alapanyagFogyas[alapanyag.id] = Math.round(alapanyagFogyas[alapanyag.id] * 100) / 100
                //.toLocaleString("hu-HU", {maximumFractionDigits: 0,})
            } else {
                me = 'darab'
                alapanyagFogyas[alapanyag.id] = Math.round(alapanyagFogyas[alapanyag.id] * 100) / 100

            }
            forgalomALAPANYAGOKHTML += `<tr >
            <td class="text-center">${alapanyag.nev}</td>
            <td class="text-right">${alapanyagFogyas[alapanyag.id]}</td>
            <td class="text-left">${me}</td>
            </tr>`
            //console.log(termek.nev + termekDB)

        }
    }
    /* for (index = 0; index < alapanyagFogyas.length; index++) {
        //VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2://VERSION-2:
        forgalomALAPANYAGOKHTML += `<tr >
        <td>${termek.nev}</td><td class="text-left">${termekDB[termek.id]}</td>
        </tr>
        `
    } */

    forgalomDBHTML += `<br><br>`
    document.getElementById("forgalomdataALAPANYAGOK").innerHTML = forgalomALAPANYAGOKHTML;
    document.getElementById("forgalomdataDB").innerHTML = forgalomDBHTML;
    document.getElementById("forgalomdataHOUR").innerHTML = forgalomHOURHTML;


    $(".updateBtn").click(function () {
        /* let arrowIndex = -1;
        for (let i = 0; i < state.forgalom.length; i++) {
            if (state.forgalom[i].id == this.id) {
                arrowIndex = i;
            }
        }
        var origNev = state.forgalom[arrowIndex].nev;
        origId = state.forgalom[arrowIndex].id;
        $("#myModal").modal();
        document.getElementById("newNev").value = origNev; */
    });
}

/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
function datepicker() {
    let dateCode = "s";
    const startDate = document.getElementById("forgalomStartDate").value;
    startFilterDate = dateConvertPickerToSQL(startDate, dateCode);
    const endDate = document.getElementById("forgalomEndDate").value;
    if (endDate !== "") {
        dateCode = "e";
        endFilterDate = dateConvertPickerToSQL(endDate, dateCode);
    }

    console.log('endFilterDate')
    console.log(endFilterDate)

    renderforgalom();
}
function dateConvertPickerToSQL(convertDatePicker, dateCode) {
    let convertDateSQL = "";
    let tempDateArray = convertDatePicker.split("-");

    if (tempDateArray.length > 1 && dateCode == "s") {
        convertDateSQL = `${tempDateArray[0]}. ${tempDateArray[1]}. ${tempDateArray[2]}. `;
    }
    if (tempDateArray.length > 1 && dateCode == "e" && parseInt(tempDateArray[2]) >= 9) {
        convertDateSQL = `${tempDateArray[0]}. ${tempDateArray[1]}. ${(
            parseInt(tempDateArray[2]) + 1
        ).toString()}. `;
    }
    if (tempDateArray.length > 1 && dateCode == "e" && parseInt(tempDateArray[2]) < 9) {
        convertDateSQL = `${tempDateArray[0]}. ${tempDateArray[1]}. 0${(
            parseInt(tempDateArray[2]) + 1
        ).toString()}. `;
    }
    return convertDateSQL;
}

function maiDatum() {
    let datum = new Date()
    let ev = datum.getFullYear()
    let honap = datum.getMonth() + 1
    honap = honap < 10 ? "0" + honap : honap
    let nap = datum.getDate()
    nap = nap < 10 ? "0" + nap : nap

    let maiNap = `${ev}. ${honap}. ${nap}.`
    console.log(maiNap)
    return maiNap
    //var endFilterDate = "2099. 12. 31.";
}
function init() {
    let i = 0
    for (i = 0; i < 24; i++) {
        forgalomHOUR[i] = 0
    }
    for (i = 0; i < termekDB.length; i++) {
        termekDB[i] = 0

    }
    for (alapanyag of state.alapanyagok) {
        alapanyagFogyas[alapanyag.id] = 0
    }
}