Date.prototype.getWeek = function () {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return (
        1 +
        Math.round(
            ((date.getTime() - week1.getTime()) / 86400000 -
                3 +
                ((week1.getDay() + 6) % 7)) /
            7
        )
    );
};
const month = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
const state = {
    transactions: [],
    pultosokPSW: [],
};
var startFilterDate = "";
var endFilterDate = "2099. 12. 31.";
var datum = new Date();
// BUG:BUG:BUG: VERSION-2: BUG:BUG:BUG:
//var statisticDatum = new Date();
// BUG:BUG:BUG: VERSION-2: BUG:BUG:BUG:
var currentDay = datum.getDate();
var currentWeek = datum.getWeek();
var currentMonth = datum.getMonth();
var currentYear = datum.getFullYear();
var beforeMonth = datum.getMonth() == 0 ? 11 : datum.getMonth() - 1
var beforeYear = datum.getMonth() == 0 ? datum.getFullYear() - 1 : datum.getFullYear()
var pultosHaviMindosszesen = []
var pultosElozoHaviMindosszesen = []
var napiKp1, napiKp2, napiCard, napiKivet, napiHaszon, napiMindosszesen, napiNetto, napiZseb;
var hetiKp1, hetiKp2, hetiCard, hetiKivet, hetiHaszon, hetiMindosszesen, hetiNetto, hetiZseb;
var haviKp1, haviKp2, haviCard, haviKivet, haviHaszon, haviMindosszesen, haviNetto, haviZseb;
var intervalKp1, intervalKp2, intervalCard, intervalKivet, intervalHaszon, intervalMindosszesen, intervalNetto, intervalZseb;
var elozoHaviKp1, elozoHaviKp2, elozoHaviCard, elozoHaviKivet, elozoHaviHaszon, elozoHaviMindosszesen, elozoHaviNetto, elozoHaviZseb;
zeroValue();
var transactionsHTML = "";
var pultosHTML = "";
var intervalHTML = "";
var pultosokOnOfflHTML = "";
var pultosokBeforeOnOfflHTML = "";
var fullWorkTimeHTML = "";
var origFullWorkTimeHTML = "";
var fullBeforeWorkTimeHTML = "";
var dayWork = []
var dayTimeWork = []
var beforeDayTimeWork = []
var beforeDayWork = []
var origFullWorkTime = []
var origBeforeFullWorkTime = []
var origFullBeforeWorkTimeHTML = ''
getdata();
async function getdata() {
    var response = await fetch("/datareadtransactions");
    state.transactions = await response.json();
    var response = await fetch("/pultosokadminpsw");
    state.pultosokPSW = await response.json();
    IntervalTransactionstions();
    renderPultosokOnOff()
}

function IntervalTransactionstions() {
    for (let transaction of state.transactions) {
        // BUG:BUG:BUG: VERSION-2: BUG:BUG:BUG:
        //let transactionDay = new Date(transaction.trdate).getDate()
        let statisticDatum = new Date();
        let newStatisticDayEzred = statisticDatum.getTime() - ((6 * 60 + 30) * 60 * 1000)
        let newStatisticDatum = new Date(newStatisticDayEzred)
        let newStatisticDay = newStatisticDatum.getDate()
        /* console.log('**************************************')
        console.log('transactionDay')
        console.log(transactionDay)
        console.log('statisticDatum')
        console.log(statisticDatum)
        console.log('newStatisticDatum')
        console.log(newStatisticDatum)
        console.log('newStatisticDay')
        console.log(newStatisticDay)
        console.log('currentStatisticDayEzred')
        console.log(currentStatisticDayEzred)
        console.log('---------------------------')
        console.log('newTransactionDay')
        console.log(newTransactionDay)
        console.log('newTransactionDay.getTime()')
        console.log(newTransactionDay.getTime())
        console.log('newTransactionDayEzred')
        console.log(newTransactionDayEzred)
        console.log('---------------------------')
        console.log()
        console.log('---------------------------')
        console.log(newStatisticDay == transactionDay) */
        // BUG:BUG:BUG: VERSION-2: BUG:BUG:BUG:
        if (
            /* new Date(transaction.trdate).getDate() == currentDay && */
            new Date(transaction.trdate).getDate() == newStatisticDay &&
            new Date(transaction.trdate).getMonth() == currentMonth &&
            new Date(transaction.trdate).getFullYear() == currentYear
        ) {
            if (transaction.trfizetesmod == "k") {
                napiKp1 += transaction.kibeosszeg;
                napiHaszon += transaction.kibeosszegbeszar;
            }
            if (transaction.trfizetesmod == "m") {
                napiKp2 += transaction.kibeosszeg;
                napiHaszon += transaction.kibeosszegbeszar;
            }
            if (transaction.trfizetesmod == "c") {
                napiCard += transaction.kibeosszeg;
                napiHaszon += transaction.kibeosszegbeszar;
            }
            if (transaction.trfizetesmod == "b") {
                napiKivet += transaction.kibeosszeg;
            }
        }
        if (
            new Date(transaction.trdate).getWeek() == currentWeek &&
            new Date(transaction.trdate).getFullYear() == currentYear
        ) {
            if (transaction.trfizetesmod == "k") {
                hetiKp1 += transaction.kibeosszeg;
                hetiHaszon += transaction.kibeosszegbeszar;
            }
            if (transaction.trfizetesmod == "m") {
                hetiKp2 += transaction.kibeosszeg;
                hetiHaszon += transaction.kibeosszegbeszar;
            }
            if (transaction.trfizetesmod == "c") {
                hetiCard += transaction.kibeosszeg;
                hetiHaszon += transaction.kibeosszegbeszar;
            }
            if (transaction.trfizetesmod == "b") {
                hetiKivet += transaction.kibeosszeg;
            }
        }

        if (
            new Date(transaction.trdate).getMonth() == currentMonth &&
            new Date(transaction.trdate).getFullYear() == currentYear
        ) {
            if (transaction.trfizetesmod == "k") {
                haviKp1 += transaction.kibeosszeg;
                haviHaszon += transaction.kibeosszegbeszar;
                pultosHaviMindosszesen[transaction.pultos] += transaction.kibeosszeg
            }
            if (transaction.trfizetesmod == "m") {
                haviKp2 += transaction.kibeosszeg;
                haviHaszon += transaction.kibeosszegbeszar;
                pultosHaviMindosszesen[transaction.pultos] += transaction.kibeosszeg
            }
            if (transaction.trfizetesmod == "c") {
                haviCard += transaction.kibeosszeg;
                haviHaszon += transaction.kibeosszegbeszar;
                pultosHaviMindosszesen[transaction.pultos] += transaction.kibeosszeg
            }
            if (transaction.trfizetesmod == "b") {
                haviKivet += transaction.kibeosszeg;
            }
        }

        if (
            new Date(transaction.trdate).getMonth() == beforeMonth &&
            new Date(transaction.trdate).getFullYear() == beforeYear
        ) {
            if (transaction.trfizetesmod == "k") {
                elozoHaviKp1 += transaction.kibeosszeg;
                elozoHaviHaszon += transaction.kibeosszegbeszar;
                pultosElozoHaviMindosszesen[transaction.pultos] += transaction.kibeosszeg
            }
            if (transaction.trfizetesmod == "m") {
                elozoHaviKp2 += transaction.kibeosszeg;
                elozoHaviHaszon += transaction.kibeosszegbeszar;
                pultosElozoHaviMindosszesen[transaction.pultos] += transaction.kibeosszeg
            }
            if (transaction.trfizetesmod == "c") {
                elozoHaviCard += transaction.kibeosszeg;
                elozoHaviHaszon += transaction.kibeosszegbeszar;
                pultosElozoHaviMindosszesen[transaction.pultos] += transaction.kibeosszeg
            }
            if (transaction.trfizetesmod == "b") {
                elozoHaviKivet += transaction.kibeosszeg;
            }
        }


    }
    ezresCsoportosit();

    transactionsHTML += `<tr><td>Napi</td><td class = "text-right">${napiKp1}</td><td class = "text-right">${napiKp2}</td><td class = "text-right">${napiCard}</td><td class = "text-right">${napiMindosszesen}</td><td class = "text-right">${napiKivet}</td><td class = "text-right">${c}</td><td class = "text-right">${napiZseb}</td></tr>

    <tr><td>Heti</td><td class = "text-right">${hetiKp1}</td><td class = "text-right">${hetiKp2}</td><td class = "text-right">${hetiCard}</td><td class = "text-right">${hetiMindosszesen}</td><td class = "text-right">${hetiKivet}</td><td class = "text-right">${hetiNetto}</td><td class = "text-right">${hetiZseb}</td></tr>

    <tr><td>Havi</td><td class = "text-right">${haviKp1}</td><td class = "text-right">${haviKp2}</td><td class = "text-right">${haviCard}</td><td class = "text-right">${haviMindosszesen}</td><td class = "text-right">${haviKivet}</td><td class = "text-right">${haviNetto}</td><td class = "text-right">${haviZseb}</td></tr>

    <tr><td>Előző havi</td><td class = "text-right">${elozoHaviKp1}</td><td class = "text-right">${elozoHaviKp2}</td><td class = "text-right">${elozoHaviCard}</td><td class = "text-right">${elozoHaviMindosszesen}</td><td class = "text-right">${elozoHaviKivet}</td><td class = "text-right">${elozoHaviNetto}</td><td class = "text-right">${elozoHaviZseb}</td></tr>`;

    document.getElementById("fullStatisticRow").innerHTML = transactionsHTML;

    /* for (index = 0; index < 4; index++) {
        pultosHTML += `<tr><td>Pultos havi</td><td>${index}</td><td>${state.pultosokPSW[index].name}</td><td class = "text-right">${pultosHaviMindosszesen[index]}</td></tr>
        <tr><td>Pultos előző havi</td><td>${index}</td><td>${state.pultosokPSW[index].name}</td><td class = "text-right">${pultosElozoHaviMindosszesen[index]}</td></tr>`
    }

    document.getElementById('pultosStatisticRow').innerHTML = pultosHTML */
}

/* TODO:TODO:TODO: CREATE TR NUMBER TODO:TODO:TODO: */
function createTrNumber() {
    trNumberDatum = new Date();
    trNumber =
        trNumberDatum.getFullYear() +
        "." +
        (trNumberDatum.getMonth() + 1) +
        "." +
        trNumberDatum.getDate() +
        "." +
        trNumberDatum.getHours() +
        "." +
        trNumberDatum.getMinutes() +
        "." +
        trNumberDatum.getSeconds() +
        "." +
        trNumberDatum.getMilliseconds();
    return trNumber;
}
function ezresCsoportosit() {
    //VERSION-2: NAPI
    napiMindosszesen = (napiKp1 + napiKp2 + napiCard).toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    c = (napiKp1 + napiKp2 + napiCard + napiKivet).toLocaleString(
        "hu-HU",
        {
            maximumFractionDigits: 0,
        }
    );
    napiZseb = (napiKp1 + napiKp2 + napiCard - napiHaszon).toLocaleString(
        "hu-HU",
        {
            maximumFractionDigits: 0,
        }
    );
    napiKp1 = napiKp1.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    napiKp2 = napiKp2.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    napiCard = napiCard.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    napiKivet = napiKivet.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    //VERSION-2: HETI
    hetiMindosszesen = (hetiKp1 + hetiKp2 + hetiCard).toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    hetiNetto = (hetiKp1 + hetiKp2 + hetiCard + hetiKivet).toLocaleString(
        "hu-HU",
        {
            maximumFractionDigits: 0,
        }
    );
    hetiZseb = (hetiKp1 + hetiKp2 + hetiCard - hetiHaszon).toLocaleString(
        "hu-HU",
        {
            maximumFractionDigits: 0,
        }
    );
    hetiKp1 = hetiKp1.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    hetiKp2 = hetiKp2.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    hetiCard = hetiCard.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    hetiKivet = hetiKivet.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    //VERSION-2: HAVI
    haviMindosszesen = (haviKp1 + haviKp2 + haviCard).toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    haviNetto = (haviKp1 + haviKp2 + haviCard + haviKivet).toLocaleString(
        "hu-HU",
        {
            maximumFractionDigits: 0,
        }
    );
    haviZseb = (haviKp1 + haviKp2 + haviCard - haviHaszon).toLocaleString(
        "hu-HU",
        {
            maximumFractionDigits: 0,
        }
    );
    haviKp1 = haviKp1.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    haviKp2 = haviKp2.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    haviCard = haviCard.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    haviKivet = haviKivet.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    //VERSION-2: INTERVAL
    intervalMindosszesen = (intervalKp1 + intervalKp2 + intervalCard).toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    intervalNetto = (intervalKp1 + intervalKp2 + intervalCard + intervalKivet).toLocaleString(
        "hu-HU",
        {
            maximumFractionDigits: 0,
        }
    );
    intervalZseb = (intervalKp1 + intervalKp2 + intervalCard - intervalHaszon).toLocaleString(
        "hu-HU",
        {
            maximumFractionDigits: 0,
        }
    );
    intervalKp1 = intervalKp1.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    intervalKp2 = intervalKp2.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    intervalCard = intervalCard.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    intervalKivet = intervalKivet.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });

    //VERSION-2: ELOZOHAVI
    elozoHaviMindosszesen = (elozoHaviKp1 + elozoHaviKp2 + elozoHaviCard).toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    elozoHaviNetto = (elozoHaviKp1 + elozoHaviKp2 + elozoHaviCard + elozoHaviKivet).toLocaleString(
        "hu-HU",
        {
            maximumFractionDigits: 0,
        }
    );
    elozoHaviZseb = (elozoHaviKp1 + elozoHaviKp2 + elozoHaviCard - elozoHaviHaszon).toLocaleString(
        "hu-HU",
        {
            maximumFractionDigits: 0,
        }
    );
    elozoHaviKp1 = elozoHaviKp1.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    elozoHaviKp2 = elozoHaviKp2.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    elozoHaviCard = elozoHaviCard.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    elozoHaviKivet = elozoHaviKivet.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
}

function zeroValue() {
    napiKp1 = napiKp2 = napiCard = napiKivet = napiHaszon = napiMindosszesen = napiNetto = napiZseb = 0;
    hetiKp1 = hetiKp2 = hetiCard = hetiKivet = hetiHaszon = hetiMindosszesen = hetiNetto = hetiZseb = 0;
    haviKp1 = haviKp2 = haviCard = haviKivet = haviHaszon = haviMindosszesen = haviNetto = haviZseb = 0;
    intervalKp1 = intervalKp2 = intervalCard = intervalKivet = intervalHaszon = intervalMindosszesen = intervalNetto = intervalZseb = 0;
    elozoHaviKp1 = elozoHaviKp2 = elozoHaviCard = elozoHaviKivet = elozoHaviHaszon = elozoHaviMindosszesen = elozoHaviNetto = elozoHaviZseb = 0;
    pultosHaviMindosszesen[0] = 0
    pultosHaviMindosszesen[1] = 0
    pultosHaviMindosszesen[2] = 0
    pultosHaviMindosszesen[3] = 0
    pultosElozoHaviMindosszesen[0] = 0
    pultosElozoHaviMindosszesen[1] = 0
    pultosElozoHaviMindosszesen[2] = 0
    pultosElozoHaviMindosszesen[3] = 0
}

function datepicker() {
    let dateCode = "s";
    const startDate = document.getElementById("transactionsStartDate").value;
    startFilterDate = dateConvertPickerToSQL(startDate, dateCode);
    const endDate = document.getElementById("transactionsEndDate").value;
    if (endDate !== "") {
        dateCode = "e";
        endFilterDate = dateConvertPickerToSQL(endDate, dateCode);
    }
    renderIntervalTransactions();
}
function dateConvertPickerToSQL(convertDatePicker, dateCode) {
    let convertDateSQL = "";
    let tempDateArray = convertDatePicker.split("-");
    if (tempDateArray.length > 1 && dateCode == "s") {
        convertDateSQL = `${tempDateArray[0]}. ${tempDateArray[1]}. ${tempDateArray[2]}. `;
    }
    if (tempDateArray.length > 1 && dateCode == "e") {
        convertDateSQL = `${tempDateArray[0]}. ${tempDateArray[1]}. ${(
            parseInt(tempDateArray[2]) + 1
        ).toString()}. `;
    }
    return convertDateSQL;
}

function renderIntervalTransactions() {
    zeroValue()
    for (let transaction of state.transactions) {
        if (
            transaction.trdate >= startFilterDate &&
            transaction.trdate <= endFilterDate
        ) {
            if (transaction.trfizetesmod == "k") {
                intervalKp1 += transaction.kibeosszeg;
                intervalHaszon += transaction.kibeosszegbeszar;
            }
            if (transaction.trfizetesmod == "m") {
                intervalKp2 += transaction.kibeosszeg;
                intervalHaszon += transaction.kibeosszegbeszar;
            }
            if (transaction.trfizetesmod == "c") {
                intervalCard += transaction.kibeosszeg;
                intervalHaszon += transaction.kibeosszegbeszar;
            }
            if (transaction.trfizetesmod == "b") {
                intervalKivet += transaction.kibeosszeg;
            }
        }
    }
    ezresCsoportosit();
    intervalHTML += `<tr><td>Intervallum</td><td>${intervalKp1}</td><td>${intervalKp2}</td><td>${intervalCard}</td><td>${intervalMindosszesen}</td><td>${intervalKivet}</td><td>${intervalNetto}</td><td>${intervalZseb}</td></tr>`
    document.getElementById('intervalStatisticRow').innerHTML = intervalHTML
    intervalHTML = ''
}

function renderPultosokOnOff() {
    let startTime = 0
    let endTime = 0
    let workTime = 0
    let fullWorkTime = []
    fullWorkTime[0] = 0
    fullWorkTime[1] = 0
    fullWorkTime[2] = 0
    fullWorkTime[3] = 0

    origFullWorkTime[0] = 0
    origFullWorkTime[1] = 0
    origFullWorkTime[2] = 0
    origFullWorkTime[3] = 0



    for (let transaction of state.transactions) {


        if (
            new Date(transaction.trdate).getMonth() == currentMonth &&
            new Date(transaction.trdate).getFullYear() == currentYear
        ) {
            if (transaction.megjegyzes == 'workTime' && transaction.trfizetesmod == 'o') {
                //startTime = new Date(transaction.trdate).getTime()
                //VERSION-2:VERSION-2:BUG:VERSION-2:VERSION-2:
                startTime = ((new Date(transaction.trdate)).setHours(7))
                startTime = ((new Date(startTime)).setMinutes(0))
                startTime = ((new Date(startTime)).setSeconds(0))
                /* console.log(new Date(startTime))
                console.log(startTime) */
                startTimeDate = new Date(startTime).toLocaleString()
                //VERSION-2:VERSION-2:BUG:VERSION-2:VERSION-2:
                pultosokOnOfflHTML += `<tr><td>${transaction.pultos}</td><td>${state.pultosokPSW[transaction.pultos].name}</td><td class="bg-success text-white">${startTimeDate}</td><td class="bg-success text-white">on</td></tr>
            `
                ////VERSION-2:
                pultosDay = new Date(transaction.trdate).getDate()
                dayWork[pultosDay] = transaction.pultos
            }
            if (transaction.megjegyzes == 'workTime' && transaction.trfizetesmod == 'f') {
                endTime = new Date(transaction.trdate).getTime()
                workTime = parseInt((endTime - startTime) / 1000 / 60)

                /* console.log('*************************' + pultosDay)
                console.log(transaction.pultos)
                console.log(startTime)
                console.log(new Date(startTime))
                console.log(endTime)
                console.log(new Date(endTime))
                console.log(workTime)
                console.log('----------------------')
 */
                //console.log(endTime)
                pultosokOnOfflHTML += `<tr><td>${transaction.pultos}</td><td >${state.pultosokPSW[transaction.pultos].name}</td><td class="bg-danger text-white">off</td><td class="bg-danger text-white">${transaction.trdate}</td></tr>
            `
                //origFullWorkTime[transaction.pultos] += workTime
                ////VERSION-2:
                pultosDay = new Date(transaction.trdate).getDate()
                dayWork[pultosDay] = transaction.pultos
                dayTimeWork[pultosDay] = workTime
            }

        }
    }
    /* console.log('origFullWorkTime')
    console.log(origFullWorkTime)
    console.log('dayWork')
    console.log(dayWork)
    console.log('dayTimeWork')
    console.log(dayTimeWork) */
    let pultos = -1
    let naptariNap = -1
    for (pultos = 0; pultos < 4; pultos++) {
        for (naptariNap = 0; naptariNap < dayTimeWork.length; naptariNap++) {
            if (pultos == dayWork[naptariNap]) {
                origFullWorkTime[pultos] += dayTimeWork[naptariNap] ? (dayTimeWork[naptariNap] / 60) : 7
            }
        }
    }

    /* let index = 0
    let indexDay = 0
    let nowDay = 0
    console.log('++++++++++++++++++++++++++' + origFullWorkTime)
    for (index = 0; index < 4; index++) {
        for (indexDay = 1; indexDay < dayTimeWork.length; indexDay++) {
            nowDay = dayTimeWork[indexDay]
            origFullWorkTime[index] += nowDay
            console.log('------------------------')
            console.log(index)
            console.log(dayTimeWork[indexDay])
            console.log(nowDay)
            console.log('------------------------')
        }
        console.log('*************************')
        console.log(origFullWorkTime)
        console.log('*************************')
    }
    console.log(origFullWorkTime)
    console.log(origFullWorkTime) */

    for (index = 0; index < dayWork.length; index++) {
        fullWorkTime[dayWork[index]] = 0
    }
    for (index = 0; index < dayWork.length; index++) {
        fullWorkTime[dayWork[index]] += 7
    }



    for (index = 0; index < 4; index++) {
        origFullWorkTimeHTML += `<tr><td>${index}</td><td>${state.pultosokPSW[index].name}</td><td>${parseInt(origFullWorkTime[index])}</td><td>${month[currentMonth]}</td></tr>`
    }
    document.getElementById('pultosOnOffRow').innerHTML = pultosokOnOfflHTML
    document.getElementById('fullWorkTimeRow').innerHTML = origFullWorkTimeHTML


    startTime = 0
    endTime = 0
    workTime = 0
    beforeFullWorkTime = []
    beforeFullWorkTime[0] = 0
    beforeFullWorkTime[1] = 0
    beforeFullWorkTime[2] = 0
    beforeFullWorkTime[3] = 0

    origBeforeFullWorkTime[0] = 0
    origBeforeFullWorkTime[1] = 0
    origBeforeFullWorkTime[2] = 0
    origBeforeFullWorkTime[3] = 0

    for (let transaction of state.transactions) {

        if (
            new Date(transaction.trdate).getMonth() == beforeMonth &&
            new Date(transaction.trdate).getFullYear() == beforeYear
        ) {
            if (transaction.megjegyzes == 'workTime' && transaction.trfizetesmod == 'o') {
                startTimeOriginal = new Date(transaction.trdate).toLocaleString()
                //VERSION-2:VERSION-2:BUG:VERSION-2:VERSION-2:
                startTime = ((new Date(transaction.trdate)).setHours(7))
                startTime = ((new Date(startTime)).setMinutes(0))
                startTime = ((new Date(startTime)).setSeconds(0))
                /* console.log(new Date(startTime))
                console.log(startTime) */
                startTimeDate = new Date(startTime).toLocaleString()
                //VERSION-2:VERSION-2:BUG:VERSION-2:VERSION-2:
                pultosokBeforeOnOfflHTML += `<tr>
                <td>${transaction.pultos}</td>
                <td>${state.pultosokPSW[transaction.pultos].name}</td>
                <td>${startTimeOriginal}</td>
                <td>${startTimeDate}</td>
                <td class="bg-success text-white">on</td></tr>
            `
                pultosDay = new Date(transaction.trdate).getDate()
                beforeDayWork[pultosDay] = transaction.pultos
            }
            if (transaction.megjegyzes == 'workTime' && transaction.trfizetesmod == 'f') {
                endTime = new Date(transaction.trdate).getTime()
                workTime = parseInt((endTime - startTime) / 1000 / 60)
                /* console.log('*************************' + pultosDay)
                console.log(transaction.pultos)
                console.log(startTime)
                console.log(new Date(startTime))
                console.log(endTime)
                console.log(new Date(endTime))
                console.log(workTime)
                console.log('----------------------')
 */
                pultosokBeforeOnOfflHTML += `<tr>
                <td>${transaction.pultos}</td>
                <td>${state.pultosokPSW[transaction.pultos].name}</td>
                <td>${transaction.trdate}</td>
                <td class="bg-danger text-white">off</td>
                <td>${transaction.trdate}</td></tr>
            `
                //beforeFullWorkTime[transaction.pultos] += workTime
                //pultosDay = new Date(transaction.trdate).getDate()
                beforeDayWork[pultosDay] = transaction.pultos
                beforeDayTimeWork[pultosDay] = workTime
                //beforeDayTimeWork[pultosDay] = workTime == '' ? 0 : workTime
            }
            /* if (workTime == '') {
                workTime = 33333
            } */
        }
    }

    /* console.log('=========================================')
    console.log(origFullWorkTime)
    console.log('beforeDayWork')
    console.log(beforeDayWork)
    console.log('beforeDayTimeWork')
    console.log(beforeDayTimeWork)
    console.log('origFullWorkTime')
    console.log(origFullWorkTime)
    console.log('beforeDayWork')
    console.log(beforeDayWork)
    console.log('beforeDayTimeWork')
    console.log(beforeDayTimeWork) */
    pultos = -1
    naptariNap = -1
    for (pultos = 0; pultos < 4; pultos++) {
        for (naptariNap = 0; naptariNap < beforeDayTimeWork.length; naptariNap++) {
            if (pultos == beforeDayWork[naptariNap]) {
                origBeforeFullWorkTime[pultos] += beforeDayTimeWork[naptariNap] ? beforeDayTimeWork[naptariNap] / 60 : 7
            }
        }
    }

    //console.log(testsumma / 60)

    for (index = 0; index < beforeDayWork.length; index++) {
        beforeFullWorkTime[beforeDayWork[index]] = 0
    }
    for (index = 0; index < beforeDayWork.length; index++) {
        beforeFullWorkTime[beforeDayWork[index]] += 7
    }

    for (index = 0; index < 4; index++) {
        origFullBeforeWorkTimeHTML += `<tr><td>${index}</td><td>${state.pultosokPSW[index].name}</td><td>${parseInt(origBeforeFullWorkTime[index])}</td><td>${month[beforeMonth]}</td></tr>`
    }
    document.getElementById('pultosBeforeOnOffRow').innerHTML = pultosokBeforeOnOfflHTML
    document.getElementById('fullBeforeWorkTimeRow').innerHTML = origFullBeforeWorkTimeHTML

    //INFO:INFO:INFO:INFO:INFO:INFO:
    //NOTE:NOTE:NOTE: pultos beveetel
    let oraBevetel = 0
    for (index = 0; index < 4; index++) {
        oraBevetel = origFullWorkTime[index] ? parseInt(parseInt(pultosHaviMindosszesen[index]) / parseInt(origFullWorkTime[index])).toLocaleString("hu-HU", { maximumFractionDigits: 0, }) : 0
        pultosHTML += `<tr>
        <td>${state.pultosokPSW[index].name}</td>
        <td>${index}</td>
        <td class="text-right">${(origFullWorkTime[index]).toLocaleString("hu-HU", {
            maximumFractionDigits: 0,
        })}</td>
        <td class = "text-right">${(pultosHaviMindosszesen[index]).toLocaleString("hu-HU", {
            maximumFractionDigits: 0,
        })}</td>
        <td class = "text-right">${oraBevetel}</td>
        </tr>`
    }
    for (index = 0; index < 4; index++) {
        oraBevetel = origBeforeFullWorkTime[index] ? parseInt(parseInt(pultosElozoHaviMindosszesen[index]) / parseInt(origBeforeFullWorkTime[index])).toLocaleString("hu-HU", { maximumFractionDigits: 0, }) : 0
        pultosHTML += `<tr>
        <td>${state.pultosokPSW[index].name} előző havi</td>
        <td>${index}</td>
        <td class="text-right">${(origBeforeFullWorkTime[index]).toLocaleString("hu-HU", {
            maximumFractionDigits: 0,
        })}</td>
        <td class = "text-right">${pultosElozoHaviMindosszesen[index].toLocaleString("hu-HU", {
            maximumFractionDigits: 0,
        })}</td>
        <td class = "text-right">${oraBevetel}</td>
        </tr>`
    }
    document.getElementById('pultosStatisticRow').innerHTML = pultosHTML
    //NOTE:NOTE:NOTE: pultos munkaidoo havi
    for (index = 0; index < 4; index++) {
        fullWorkTimeHTML += `<tr><td>${index}</td><td>${state.pultosokPSW[index].name}</td><td>${parseInt(fullWorkTime[index])}</td><td>${month[currentMonth]}</td></tr>`
    }
    //NOTE:NOTE:NOTE: pultos munkaidoo eloozoo havi
    for (index = 0; index < 4; index++) {
        fullBeforeWorkTimeHTML += `<tr><td>${index}</td><td>${state.pultosokPSW[index].name}</td><td>${parseInt(beforeFullWorkTime[index])}</td><td>${month[beforeMonth]}</td></tr>`
    }
    //INFO:INFO:INFO:INFO:INFO:INFO:
}
function ezresCsoportositHavi() {
    pultosHaviMindosszesen[0] = pultosHaviMindosszesen[0].toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    pultosHaviMindosszesen[1] = pultosHaviMindosszesen[1].toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    pultosHaviMindosszesen[2] = pultosHaviMindosszesen[2].toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    pultosHaviMindosszesen[3] = pultosHaviMindosszesen[3].toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
}
function ezresCsoportositElozoHavi() {
    pultosElozoHaviMindosszesen[0] = pultosElozoHaviMindosszesen[0].toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    pultosElozoHaviMindosszesen[1] = pultosElozoHaviMindosszesen[1].toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    pultosElozoHaviMindosszesen[2] = pultosElozoHaviMindosszesen[2].toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
    pultosElozoHaviMindosszesen[3] = pultosElozoHaviMindosszesen[3].toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
    });
}