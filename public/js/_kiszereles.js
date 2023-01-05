var lastTransaction = -1;
const state = {
    kiszereles: [],
};
var xid = 1;

getdata();

/* INFO: termék adatok bekérése START INFO: */
async function getdata() {
    /* NOTE: get last-transaction */
    /* var response = await fetch("/lasttransaction");
    state.lastTransaction = await response.json();
    console.log("lastTransaction 😎");
    console.log(state.lastTransaction[0].ltr); */

    /* NOTE: get kiszereles */
    var response = await fetch("/datareadkiszereles");
    state.kiszereles = await response.json();

    renderkiszereles();

    /* NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE: */
    $(document).ready(function () {
        $("#newdata").click(function () {
            insertMySQL();

            async function insertMySQL() {
                /* HACK:HACK:HACK: */
                const nevInput = document.querySelector("#nev");
                const nev = nevInput.value == "" ? "noname" : nevInput.value;
                nevInput.value = "";
                /* HACK:HACK:HACK: */
                const urtartalomInput = document.querySelector("#urtartalom");
                const urtartalom =
                    urtartalomInput.value == ""
                        ? "0"
                        : urtartalomInput.value * 100;
                urtartalomInput.value = "";
                /* HACK:HACK:HACK: */
                var id = xid + 1;
                /* INFO: insert  INFO:INFO:INFO:INFO:INFO:INFO:INFO: */
                await fetch("/insertkiszereles/", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ nev: nev, urtartalom: urtartalom }),
                });
                /* INFO: insert  INFO:INFO:INFO:INFO:INFO:INFO:INFO: */
                kiszerelesHTML += `<tr >
                <td>${id}</td>
                <td>${nev}</td>
                <td>${urtartalom}</td>
                </tr>
                `;
                id++;
                xid++;
                document.getElementById("kiszereles").innerHTML =
                    kiszerelesHTML;
            }
        });
    });
}

/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
function updatekiszereles() {
    const nev = document.getElementById("newNev").value;
    const urtartalom = document.getElementById("newUrtartalom").value;
    try {
        updateMySQL();
    } catch (e) {}
    async function updateMySQL() {
        id = origId;

        const response = await fetch("/updatekiszereles/", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ nev: nev, urtartalom: urtartalom, id: id }),
        });
        console.log(response);
        let arrowIndex = -1;
        for (let i = 0; i < state.kiszereles.length; i++) {
            if (state.kiszereles[i].id == id) {
                arrowIndex = i;
            }
        }
        state.kiszereles[arrowIndex].nev = nev;
        state.kiszereles[arrowIndex].urtartalom = urtartalom;
        renderkiszereles();
    }
}
/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */

document.addEventListener("keypress", function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
    }
});

function renderkiszereles() {
    let index = 0;
    kiszerelesHTML = "";
    console.log(state.kiszereles[0].nev);
    for (let vkiszereles of state.kiszereles) {
        kiszerelesHTML += `<tr >
                <td>${vkiszereles.id}</td>
                <td>${vkiszereles.nev}</td>
                <td>${vkiszereles.urtartalom}</td>`;
        if (vkiszereles.id > 2) {
            kiszerelesHTML += `<td><button class="updateBtn disabled" id=${vkiszereles.id}>Edit</td>`;
        }
        `</tr>
     `;
        index++;
        xid = vkiszereles.id;
    }
    document.getElementById("kiszereles").innerHTML = kiszerelesHTML;

    $(".updateBtn").click(function () {
        let arrowIndex = -1;
        for (let i = 0; i < state.kiszereles.length; i++) {
            if (state.kiszereles[i].id == this.id) {
                arrowIndex = i;
            }
        }
        var origNev = state.kiszereles[arrowIndex].nev;
        var origUrtartalom = state.kiszereles[arrowIndex].urtartalom;
        origId = state.kiszereles[arrowIndex].id;
        $("#myModal").modal();
        document.getElementById("newNev").value = origNev;
        document.getElementById("newUrtartalom").value = origUrtartalom;
    });
}
