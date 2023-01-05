//var lastTransaction = -1;
// NOTE: Ez definiálja a bekért adatok ojektum tömbjét 😎
const state = {
    csoportok: [],
};
// NOTE: Ezek kellenek a forgalom adatokhoz ?????
var xid = 1;
var origId = -1;

getdata();

/* INFO: termék adatok bekérése START INFO: */
async function getdata() {
    /* NOTE: get csoportok INFO: INFO: INFO:*/
    var response = await fetch("/datareadcsoport");
    state.csoportok = await response.json();

    rendercsoportok();

    /* NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE:NOTE: */
    $(document).ready(function () {
        $("#newdata").click(function () {
            try {
                insertMySQL();
            } catch (e) {
                alert("catch vizsgálata!!!");
            }
            async function insertMySQL() {
                const nevInput = document.querySelector("#nev");
                const nev = nevInput.value;
                nevInput.value = "*";
                var id = xid + 1;
                /* INFO:INFO:INFO:INFO:INFO:INFO:INFO:INFO:*/
                await fetch("/insertcsoportok/", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ nev: nev }),
                });
                /* INFO:INFO:INFO:INFO:INFO:INFO:INFO:INFO:*/
                csoportokHTML += `<tr >
                <td>${nev}</td>
                </tr>
                `;
                id++;
                xid++;
                document.getElementById("xkimeresdata").innerHTML =
                    csoportokHTML;
            }
        });
    });
}

/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */
function updatecsoportok() {
    const nev = document.getElementById("newNev").value;
    try {
        updateMySQL();
    } catch (e) {}
    async function updateMySQL() {
        id = origId;

        const response = await fetch("/updatecsoportok/", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ nev: nev, id: id }),
        });
        console.log(response);
        let arrowIndex = -1;
        for (let i = 0; i < state.csoportok.length; i++) {
            if (state.csoportok[i].id == id) {
                arrowIndex = i;
            }
        }
        state.csoportok[arrowIndex].nev = nev;
        rendercsoportok();
    }
}
/* TODO:TODO:TODO:TODO:TODO:TODO:TODO: */

document.addEventListener("keypress", function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
    }
});

//BUG:BUG:BUG:BUG:BUG:BUG:BUG:
function rendercsoportok() {
    let index = 0;
    csoportokHTML = "";
    for (let vKimeresnev of state.csoportok) {
        csoportokHTML += `<tr >
        <td>${vKimeresnev.nev}</td>
        <td>${vKimeresnev.id}</td>
        <td><button class="updateBtn" id=${vKimeresnev.id}>Edit</td>
        </tr>
        `;
        index++;
        xid = vKimeresnev.id;
    }
    document.getElementById("xkimeresdata").innerHTML = csoportokHTML;

    $(".updateBtn").click(function () {
        let arrowIndex = -1;
        for (let i = 0; i < state.csoportok.length; i++) {
            if (state.csoportok[i].id == this.id) {
                arrowIndex = i;
            }
        }
        var origNev = state.csoportok[arrowIndex].nev;
        origId = state.csoportok[arrowIndex].id;
        $("#myModal").modal();
        document.getElementById("newNev").value = origNev;
    });
}
//BUG:BUG:BUG:BUG:BUG:BUG:BUG:
