var lastTransaction = -1;
const state = {
    xkimeresnev: [],
};
var xid = 1;

getdata();

/* INFO: termék adatok bekérése START INFO: */
async function getdata() {
    var response = await fetch("/datareadxkimeresnev");
    state.xkimeresnev = await response.json();

    renderXkimeresnev();

    /* NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE: */
    $(document).ready(function () {
        $("#newdata").click(function () {
            $("#nev").change(function () {
                let nevInput = $("#nev");
                //let v = $(this).val();
                let urtartalomInput = document.querySelector("#urtartalom");
                /* if (v !== null) {
                    console.log("************************************");
                } */
            });

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
                /* INFO: insertxkimeresnev  INFO:INFO:INFO:INFO:INFO:INFO:INFO:*/
                await fetch("/insertxkimeresnev/", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ nev: nev, urtartalom: urtartalom }),
                });
                xkimeresnevHTML += `<tr >
                <td>${id}</td>
                <td>${nev}</td>
                <td>${urtartalom}</td>
                </tr>
                `;
                id++;
                xid++;
                document.getElementById("xkimeresdata").innerHTML =
                    xkimeresnevHTML;
            }
        });
    });
}

/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
function updatexkimeresnev() {
    const nev = document.getElementById("newNev").value;
    const urtartalom = document.getElementById("newUrtartalom").value * 100;
    try {
        updateMySQL();
    } catch (e) {}
    async function updateMySQL() {
        id = origId;

        const response = await fetch("/updatexkimeresnev/", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ nev: nev, urtartalom: urtartalom, id: id }),
        });
        console.log(response);
        let arrowIndex = -1;
        for (let i = 0; i < state.xkimeresnev.length; i++) {
            if (state.xkimeresnev[i].id == id) {
                arrowIndex = i;
            }
        }
        state.xkimeresnev[arrowIndex].nev = nev;
        state.xkimeresnev[arrowIndex].urtartalom = urtartalom;
        renderXkimeresnev();
    }
}
/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */

document.addEventListener("keypress", function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
    }
});

function renderXkimeresnev() {
    let index = 0;
    xkimeresnevHTML = "";
    for (let vKimeresnev of state.xkimeresnev) {
        xkimeresnevHTML += `<tr >
                <td>${vKimeresnev.id}</td>
                <td>${vKimeresnev.nev}</td>
                <td>${vKimeresnev.urtartalom}</td>
                <td><button class="updateBtn" id=${vKimeresnev.id}>Edit</td>
                </tr>
     `;
        index++;
        xid = vKimeresnev.id;
    }
    document.getElementById("xkimeresdata").innerHTML = xkimeresnevHTML;

    $(".updateBtn").click(function () {
        let arrowIndex = -1;
        for (let i = 0; i < state.xkimeresnev.length; i++) {
            if (state.xkimeresnev[i].id == this.id) {
                arrowIndex = i;
            }
        }
        var origNev = state.xkimeresnev[arrowIndex].nev;
        var origUrtartalom = state.xkimeresnev[arrowIndex].urtartalom / 100;
        origId = state.xkimeresnev[arrowIndex].id;
        $("#myModal").modal();
        document.getElementById("newNev").value = origNev;
        document.getElementById("newUrtartalom").value = origUrtartalom;
    });
}
