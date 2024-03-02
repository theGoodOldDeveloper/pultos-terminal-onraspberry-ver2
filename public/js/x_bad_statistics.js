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
const month = [
  "Január",
  "Február",
  "Március",
  "Április",
  "Május",
  "Június",
  "Július",
  "Augusztus",
  "Szeptember",
  "Október",
  "November",
  "December",
];
const state = {
  transactions: [],
  transactionsinterval: [],
  pultosokPSW: [],
  forgalom: [],
  sum: [],
};
const sevenDay = 70 * 24 * 60 * 60 * 1000;
const timePlus = 6 * 60 * 60 * 1000 + 45 * 60 * 1000;
var startFilterDate = "";
var endFilterDate = "2099. 12. 31.";
var datum = new Date();
// BUG:BUG:BUG: INFO: BUG:BUG:BUG:
//var statisticDatum = new Date();
// BUG:BUG:BUG: INFO: BUG:BUG:BUG:
var currentDay = datum.getDate();
var currentWeek = datum.getWeek();
var currentMonth = datum.getMonth();
var currentYear = datum.getFullYear();

console.log(
  "nap",
  currentDay,
  "het",
  currentWeek,
  "honap",
  currentMonth,
  "ev",
  currentYear
);

var beforeMonth = datum.getMonth() == 0 ? 11 : datum.getMonth() - 1;
var beforeYear =
  datum.getMonth() == 0 ? datum.getFullYear() - 1 : datum.getFullYear();
var pultosHaviMindosszesen = [];
var pultosElozoHaviMindosszesen = [];
var napiKp1,
  napiKp2,
  napiCard,
  napiKivet,
  napiHaszon,
  napiMindosszesen,
  napiNetto,
  napiZseb;
var hetiKp1,
  hetiKp2,
  hetiCard,
  hetiKivet,
  hetiHaszon,
  hetiMindosszesen,
  hetiNetto,
  hetiZseb;
var haviKp1,
  haviKp2,
  haviCard,
  haviKivet,
  haviHaszon,
  haviMindosszesen,
  haviNetto,
  haviZseb;
var intervalKp1,
  intervalKp2,
  intervalCard,
  intervalKivet,
  intervalHaszon,
  intervalMindosszesen,
  intervalNetto,
  intervalZseb;
var elozoHaviKp1,
  elozoHaviKp2,
  elozoHaviCard,
  elozoHaviKivet,
  elozoHaviHaszon,
  elozoHaviMindosszesen,
  elozoHaviNetto,
  elozoHaviZseb;
zeroValue();
var transactionsHTML = "";
var pultosHTML = "";
var intervalHTML = "";
var pultosokOnOfflHTML = "";
var pultosokBeforeOnOfflHTML = "";
var fullWorkTimeHTML = "";
var origFullWorkTimeHTML = "";
var fullBeforeWorkTimeHTML = "";
var dayWork = [];
var dayTimeWork = [];
var beforeDayTimeWork = [];
var beforeDayWork = [];
var origFullWorkTime = [];
var origBeforeFullWorkTime = [];
var origFullBeforeWorkTimeHTML = "";
getdata();
async function getdata() {
  //var response = await fetch("/datareadtransactions");
  var response = await fetch("/datareadtransactionssevenday");
  state.transactions = await response.json();
  var response = await fetch("/datareadforgalomsevenday");
  state.forgalom = await response.json();
  //NOTE: update
  /* console.log(state.transactions);
  let datum = "2024. 02. 28. 15:10:20";
  console.log(datum);
  console.log(Date.parse(datum));
  let temDate = 1709129420000;
  let newDate = new Date(temDate);
  console.log(newDate); */
  //NOTE: update

  //HACK: new forgalom OK
  //localStorage.setItem("state.forgalom", JSON.stringify(state.forgalom));
  /* localStorage.setItem(
    "state.transactions",
    JSON.stringify(state.transactions)
  ); */
  //console.log("state.forgalom: ", state.forgalom);
  //console.log("state.transactions: ", state.transactions);

  state.sum = state.forgalom.map((tetel) => {
    const tranzakcio = state.transactions.find(
      (tranzakcio) => tranzakcio.id === tetel.transaction_id
    );
    return { ...tetel, ...tranzakcio };
  });

  console.log(state.sum);
  localStorage.setItem("state.sum", JSON.stringify(state.sum));

  /* console.log("forgalom", state.forgalom);
console.log("transactions-tranaction", state.forgalom[3].transaction_id);
console.log("transactions", state.transactions); */
  /* console.log("osszetevok", state.osszetevok);
console.log("termekek", state.termekek);
console.log("alapanyagok", state.alapanyagok); */
  /* for (let forg of state.forgalom) {
  for (let transactions of state.transactions) {
    if (forg.transaction_id == transactions.id) {
      console.log(
        "forg.id: 😈 ",
        forg.id,
        "transactions.id: 😈 ",
        transactions.id,
        "transactions.pultos: 😈 ",
        transactions.pultos
      );
    }
  }
} */
  //HACK: new forgalom OK

  var response = await fetch("/pultosokadminpsw");
  state.pultosokPSW = await response.json();
  IntervalTransactionstions();
  renderPultosokOnOff();
}

function IntervalTransactionstions() {
  //ezresCsoportosit();
  //HACK:                                                        new forgalom OK

  const transactions = state.sum;

  // Beállítjuk a dátumformátumot
  const dateFormat = "YYYY. MM. DD.";

  // Dátum tartományok definiálása
  const today = moment().format(dateFormat);
  const yesterday = moment().subtract(1, "days").format(dateFormat);
  const weekStart = moment().startOf("week").format(dateFormat);
  const weekEnd = moment().endOf("week").format(dateFormat);
  const monthStart = moment().startOf("month").format(dateFormat);
  const monthEnd = moment().endOf("month").format(dateFormat);
  const previousMonthStart = moment()
    .subtract(1, "months")
    .startOf("month")
    .format(dateFormat);
  const previousMonthEnd = moment()
    .subtract(1, "months")
    .endOf("month")
    .format(dateFormat);

  // Összesítő objektumok definiálása
  const dailySummary = { c: 0, k: 0, m: 0, total: 0, beszar: 0, profit: 0 };
  const weeklySummary = { ...dailySummary };
  const monthlySummary = { ...dailySummary };
  const previousMonthlySummary = { ...dailySummary };

  // Összesítések kiszámítása
  transactions.forEach((transaction) => {
    const date = moment(transaction.eladottdate).format(dateFormat);

    // Napi összesítés
    if (date === today) {
      dailySummary[transaction.trfizetesmod] += transaction.db;
      dailySummary.total += transaction.db * transaction.eladottelar;
      dailySummary.beszar += transaction.db * transaction.eladottbeszar;
      dailySummary.profit +=
        transaction.db * transaction.eladottelar -
        transaction.db * transaction.eladottbeszar;
    }

    // Heti összesítés
    if (date >= weekStart && date <= weekEnd) {
      weeklySummary[transaction.trfizetesmod] += transaction.db;
      weeklySummary.total += transaction.db * transaction.eladottelar;
      weeklySummary.beszar += transaction.db * transaction.eladottbeszar;
      weeklySummary.profit +=
        transaction.db * transaction.eladottelar -
        transaction.db * transaction.eladottbeszar;
    }

    // Havi összesítés
    if (date >= monthStart && date <= monthEnd) {
      monthlySummary[transaction.trfizetesmod] += transaction.db;
      monthlySummary.total += transaction.db * transaction.eladottelar;
      monthlySummary.beszar += transaction.db * transaction.eladottbeszar;
      monthlySummary.profit +=
        transaction.db * transaction.eladottelar -
        transaction.db * transaction.eladottbeszar;
    }

    // Előző havi összesítés
    if (date >= previousMonthStart && date <= previousMonthEnd) {
      previousMonthlySummary[transaction.trfizetesmod] += transaction.db;
      previousMonthlySummary.total += transaction.db * transaction.eladottelar;
      previousMonthlySummary.beszar +=
        transaction.db * transaction.eladottbeszar;
      previousMonthlySummary.profit +=
        transaction.db * transaction.eladottelar -
        transaction.db * transaction.eladottbeszar;
    }
  });

  // HTML template literál
  const transactionsHTML = `
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Összesítés</th>
          <th>C</th>
          <th>K</th>
          <th>M</th>
          <th>Összeg</th>
          <th>Beszerzési ár</th>
          <th>Profit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Naponta</td>
          <td><span class="math-inline">\{dailySummary\.c\}</td\>
  <td\></span>{dailySummary.k}</td>
          <td><span class="math-inline">\{dailySummary\.m\}</td\>
  <td\></span>{dailySummary.total}</td>
          <td><span class="math-inline">\{dailySummary\.beszar\}</td\>
  <td\></span>{dailySummary.profit}</td>
        </tr>
        <tr>
          <td>Heti</td>
          <td><span class="math-inline">\{weeklySummary\.c\}</td\>
  <td\></span>{weeklySummary.k}</td>
          <td><span class="math-inline">\{weeklySummary\.m\}</td\>
  <td\></span>{weeklySummary.total}</td>
          <td><span class="math-inline">\{weeklySummary\.beszar\}</td\>
  <td\></span>{weeklySummary.profit}</td>
        </tr>
        <tr>
          <td>Havi</td>
          <td>${monthlySummary.c}</td>
          <td>${monthlySummary.k}</td>
          <td>${monthlySummary.m}</td>
          <td>${monthlySummary.total}</td>
          <td>${monthlySummary.beszar}</td>
          <td>${monthlySummary.profit}</td>
        </tr>
        <tr>
          <td>Előzó havi</td>
          <td>${previousMonthlySummary.c}</td>
          <td>${previousMonthlySummary.k}</td>
          <td>${previousMonthlySummary.m}</td>
          <td>${previousMonthlySummary.total}</td>
          <td>${previousMonthlySummary.beszar}</td>
          <td>${previousMonthlySummary.profit}</td>
        </tr>
      </tbody>
    </table>
  `;

  //HACK:                                                        new forgalom OK

  document.getElementById("fullStatisticRow").innerHTML = transactionsHTML;
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
  //INFO: NAPI
  napiMindosszesen = (napiKp1 + napiKp2 + napiCard).toLocaleString("hu-HU", {
    maximumFractionDigits: 0,
  });
  c = (napiKp1 + napiKp2 + napiCard + napiKivet).toLocaleString("hu-HU", {
    maximumFractionDigits: 0,
  });
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
  //INFO: HETI
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
  //INFO: HAVI
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
  //INFO: INTERVAL
  intervalMindosszesen = (
    intervalKp1 +
    intervalKp2 +
    intervalCard
  ).toLocaleString("hu-HU", {
    maximumFractionDigits: 0,
  });
  intervalNetto = (
    intervalKp1 +
    intervalKp2 +
    intervalCard +
    intervalKivet
  ).toLocaleString("hu-HU", {
    maximumFractionDigits: 0,
  });
  intervalZseb = (
    intervalKp1 +
    intervalKp2 +
    intervalCard -
    intervalHaszon
  ).toLocaleString("hu-HU", {
    maximumFractionDigits: 0,
  });
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

  //INFO: ELOZOHAVI
  elozoHaviMindosszesen = (
    elozoHaviKp1 +
    elozoHaviKp2 +
    elozoHaviCard
  ).toLocaleString("hu-HU", {
    maximumFractionDigits: 0,
  });
  elozoHaviNetto = (
    elozoHaviKp1 +
    elozoHaviKp2 +
    elozoHaviCard +
    elozoHaviKivet
  ).toLocaleString("hu-HU", {
    maximumFractionDigits: 0,
  });
  elozoHaviZseb = (
    elozoHaviKp1 +
    elozoHaviKp2 +
    elozoHaviCard -
    elozoHaviHaszon
  ).toLocaleString("hu-HU", {
    maximumFractionDigits: 0,
  });
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
  napiKp1 =
    napiKp2 =
    napiCard =
    napiKivet =
    napiHaszon =
    napiMindosszesen =
    napiNetto =
    napiZseb =
      0;
  hetiKp1 =
    hetiKp2 =
    hetiCard =
    hetiKivet =
    hetiHaszon =
    hetiMindosszesen =
    hetiNetto =
    hetiZseb =
      0;
  haviKp1 =
    haviKp2 =
    haviCard =
    haviKivet =
    haviHaszon =
    haviMindosszesen =
    haviNetto =
    haviZseb =
      0;
  intervalKp1 =
    intervalKp2 =
    intervalCard =
    intervalKivet =
    intervalHaszon =
    intervalMindosszesen =
    intervalNetto =
    intervalZseb =
      0;
  elozoHaviKp1 =
    elozoHaviKp2 =
    elozoHaviCard =
    elozoHaviKivet =
    elozoHaviHaszon =
    elozoHaviMindosszesen =
    elozoHaviNetto =
    elozoHaviZseb =
      0;
  pultosHaviMindosszesen[0] = 0;
  pultosHaviMindosszesen[1] = 0;
  pultosHaviMindosszesen[2] = 0;
  pultosHaviMindosszesen[3] = 0;
  pultosElozoHaviMindosszesen[0] = 0;
  pultosElozoHaviMindosszesen[1] = 0;
  pultosElozoHaviMindosszesen[2] = 0;
  pultosElozoHaviMindosszesen[3] = 0;
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
  let mont31 = [1, 3, 5, 7, 8, 10, 12];
  let mont30 = [4, 6, 9, 11];
  let mont28 = [2];
  let convertDateSQL = "";
  let tempDateArray = convertDatePicker.split("-");
  if (tempDateArray.length > 1 && dateCode == "s") {
    convertDateSQL = `${tempDateArray[0]}. ${tempDateArray[1]}. ${tempDateArray[2]}. 6:44:59`;
  }
  if (tempDateArray.length > 1 && dateCode == "e") {
    if (
      mont31.includes(parseInt(tempDateArray[1])) &&
      parseInt(tempDateArray[2]) == 31
    ) {
      console.log("😊👌😁", tempDateArray[1]);
      tempDateArray[2] = "00";
      /* tempDateArray[1] = (parseInt(tempDateArray[1]) + 1).toString() */
      if (parseInt(tempDateArray[1]) == 12) {
        tempDateArray[0] = (parseInt(tempDateArray[0]) + 1).toString();
        tempDateArray[1] = "01";
        console.log("eeeeeeevvv", tempDateArray[0]);
      } else {
        tempDateArray[1] = (parseInt(tempDateArray[1]) + 1).toString();
      }
    }

    if (
      mont31.includes(parseInt(tempDateArray[1])) &&
      parseInt(tempDateArray[2]) == 31
    ) {
      console.log("😊👌😁", tempDateArray[1]);
      tempDateArray[2] = "00";
      tempDateArray[1] = (parseInt(tempDateArray[1]) + 1).toString();
    }
    if (
      mont30.includes(parseInt(tempDateArray[1])) &&
      parseInt(tempDateArray[2]) == 30
    ) {
      console.log("😊👌😁", tempDateArray[1]);
      tempDateArray[2] = "00";
      tempDateArray[1] = (parseInt(tempDateArray[1]) + 1).toString();
    }
    if (
      mont28.includes(parseInt(tempDateArray[1])) &&
      parseInt(tempDateArray[2]) == 28
    ) {
      //console.log('😊👌😁', tempDateArray[1])
      tempDateArray[2] = "00";
      tempDateArray[1] = (parseInt(tempDateArray[1]) + 1).toString();
    }

    convertDateSQL = `${tempDateArray[0]}. ${tempDateArray[1]}. ${(
      parseInt(tempDateArray[2]) + 1
    ).toString()}. 6:45:00`;
  }
  //INFO:TODO:INFO:
  //console.log(convertDatePicker, dateCode)

  //INFO:TODO:INFO:
  return convertDateSQL;
}

function renderIntervalTransactions() {
  //INFO:TODO:INFO:
  //console.log('startFilterDate', startFilterDate)
  //console.log('endFilterDate', endFilterDate)
  // INFO: TODO: INFO:
  getTransactionItervallum();
  async function getTransactionItervallum() {
    let sendStartFilterDate = convertDatum(startFilterDate);
    let sendEndFilterDate = convertDatum(endFilterDate);

    response = await fetch(
      `/datareadtransactionssevenday/${sendStartFilterDate}`,
      {
        method: "GET",
        headers: {
          "Content-type": "text/html",
          sendstartdatum: sendStartFilterDate,
          tempstart: sendEndFilterDate,
          tempend: sendEndFilterDate,
          sendenddatum: sendEndFilterDate,
        },
      }
    );
    state.transactionsinterval = await response.json();

    zeroValue();
    let i = 0;
    for (let transaction of state.transactionsinterval) {
      i++;
      if (
        Date.parse(transaction.trdate) >= Date.parse(startFilterDate) &&
        Date.parse(transaction.trdate) <= Date.parse(endFilterDate)
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
    intervalHTML += `<tr><td>Intervallum</td><td>${intervalKp1}</td><td>${intervalKp2}</td><td>${intervalCard}</td><td>${intervalMindosszesen}</td><td>${intervalKivet}</td><td>${intervalNetto}</td><td>${intervalZseb}</td></tr>`;
    document.getElementById("intervalStatisticRow").innerHTML = intervalHTML;
    intervalHTML = "";
  }
}

function renderPultosokOnOff() {
  let startTime = 0;
  let endTime = 0;
  let workTime = 0;
  let fullWorkTime = [];
  fullWorkTime[0] = 0;
  fullWorkTime[1] = 0;
  fullWorkTime[2] = 0;
  fullWorkTime[3] = 0;

  origFullWorkTime[0] = 0;
  origFullWorkTime[1] = 0;
  origFullWorkTime[2] = 0;
  origFullWorkTime[3] = 0;

  for (let transaction of state.transactions) {
    if (
      new Date(transaction.trdate).getMonth() == currentMonth &&
      new Date(transaction.trdate).getFullYear() == currentYear
    ) {
      if (
        transaction.megjegyzes == "workTime" &&
        transaction.trfizetesmod == "o"
      ) {
        //startTime = new Date(transaction.trdate).getTime()
        //INFO:INFO:BUG:INFO:INFO:
        startTime = new Date(transaction.trdate).setHours(7);
        startTime = new Date(startTime).setMinutes(0);
        startTime = new Date(startTime).setSeconds(0);
        /* console.log(new Date(startTime))
                console.log(startTime) */
        startTimeDate = new Date(startTime).toLocaleString();
        //INFO:INFO:BUG:INFO:INFO:
        pultosokOnOfflHTML += `<tr><td>${transaction.pultos}</td><td>${
          state.pultosokPSW[transaction.pultos].name
        }</td><td class="bg-success text-white">${startTimeDate}</td><td class="bg-success text-white">on</td></tr>
            `;
        ////INFO:
        pultosDay = new Date(transaction.trdate).getDate();
        dayWork[pultosDay] = transaction.pultos;
      }
      if (
        transaction.megjegyzes == "workTime" &&
        transaction.trfizetesmod == "f"
      ) {
        endTime = new Date(transaction.trdate).getTime();
        workTime = parseInt((endTime - startTime) / 1000 / 60);

        //console.log(endTime)
        pultosokOnOfflHTML += `<tr><td>${transaction.pultos}</td><td >${
          state.pultosokPSW[transaction.pultos].name
        }</td><td class="bg-danger text-white">off</td><td class="bg-danger text-white">${
          transaction.trdate
        }</td></tr>
            `;
        //origFullWorkTime[transaction.pultos] += workTime
        ////INFO:
        pultosDay = new Date(transaction.trdate).getDate();
        dayWork[pultosDay] = transaction.pultos;
        dayTimeWork[pultosDay] = workTime;
      }
    }
  }

  let pultos = -1;
  let naptariNap = -1;
  for (pultos = 0; pultos < 4; pultos++) {
    for (naptariNap = 0; naptariNap < dayTimeWork.length; naptariNap++) {
      if (pultos == dayWork[naptariNap]) {
        origFullWorkTime[pultos] += dayTimeWork[naptariNap]
          ? dayTimeWork[naptariNap] / 60
          : 7;
      }
    }
  }

  for (index = 0; index < dayWork.length; index++) {
    fullWorkTime[dayWork[index]] = 0;
  }
  for (index = 0; index < dayWork.length; index++) {
    fullWorkTime[dayWork[index]] += 7;
  }

  for (index = 0; index < 4; index++) {
    origFullWorkTimeHTML += `<tr><td>${index}</td><td>${
      state.pultosokPSW[index].name
    }</td><td>${parseInt(origFullWorkTime[index])}</td><td>${
      month[currentMonth]
    }</td></tr>`;
  }
  document.getElementById("pultosOnOffRow").innerHTML = pultosokOnOfflHTML;
  // BUG: - document.getElementById('fullWorkTimeRow').innerHTML = origFullWorkTimeHTML

  startTime = 0;
  endTime = 0;
  workTime = 0;
  beforeFullWorkTime = [];
  beforeFullWorkTime[0] = 0;
  beforeFullWorkTime[1] = 0;
  beforeFullWorkTime[2] = 0;
  beforeFullWorkTime[3] = 0;

  origBeforeFullWorkTime[0] = 0;
  origBeforeFullWorkTime[1] = 0;
  origBeforeFullWorkTime[2] = 0;
  origBeforeFullWorkTime[3] = 0;

  for (let transaction of state.transactions) {
    if (
      new Date(transaction.trdate).getMonth() == beforeMonth &&
      new Date(transaction.trdate).getFullYear() == beforeYear
    ) {
      if (
        transaction.megjegyzes == "workTime" &&
        transaction.trfizetesmod == "o"
      ) {
        startTimeOriginal = new Date(transaction.trdate).toLocaleString();
        //INFO:INFO:BUG:INFO:INFO:
        startTime = new Date(transaction.trdate).setHours(7);
        startTime = new Date(startTime).setMinutes(0);
        startTime = new Date(startTime).setSeconds(0);
        /* console.log(new Date(startTime))
                console.log(startTime) */
        startTimeDate = new Date(startTime).toLocaleString();
        //INFO:INFO:BUG:INFO:INFO:
        pultosokBeforeOnOfflHTML += `<tr>
                <td>${transaction.pultos}</td>
                <td>${state.pultosokPSW[transaction.pultos].name}</td>
                <td>${startTimeOriginal}</td>
                <td>${startTimeDate}</td>
                <td class="bg-success text-white">on</td></tr>
            `;
        pultosDay = new Date(transaction.trdate).getDate();
        beforeDayWork[pultosDay] = transaction.pultos;
      }
      if (
        transaction.megjegyzes == "workTime" &&
        transaction.trfizetesmod == "f"
      ) {
        endTime = new Date(transaction.trdate).getTime();
        workTime = parseInt((endTime - startTime) / 1000 / 60);

        pultosokBeforeOnOfflHTML += `<tr>
                <td>${transaction.pultos}</td>
                <td>${state.pultosokPSW[transaction.pultos].name}</td>
                <td>${transaction.trdate}</td>
                <td class="bg-danger text-white">off</td>
                <td>${transaction.trdate}</td></tr>
            `;
        //beforeFullWorkTime[transaction.pultos] += workTime
        //pultosDay = new Date(transaction.trdate).getDate()
        beforeDayWork[pultosDay] = transaction.pultos;
        beforeDayTimeWork[pultosDay] = workTime;
        //beforeDayTimeWork[pultosDay] = workTime == '' ? 0 : workTime
      }
    }
  }

  pultos = -1;
  naptariNap = -1;
  for (pultos = 0; pultos < 4; pultos++) {
    for (naptariNap = 0; naptariNap < beforeDayTimeWork.length; naptariNap++) {
      if (pultos == beforeDayWork[naptariNap]) {
        origBeforeFullWorkTime[pultos] += beforeDayTimeWork[naptariNap]
          ? beforeDayTimeWork[naptariNap] / 60
          : 7;
      }
    }
  }

  //console.log(testsumma / 60)

  for (index = 0; index < beforeDayWork.length; index++) {
    beforeFullWorkTime[beforeDayWork[index]] = 0;
  }
  for (index = 0; index < beforeDayWork.length; index++) {
    beforeFullWorkTime[beforeDayWork[index]] += 7;
  }

  for (index = 0; index < 4; index++) {
    origFullBeforeWorkTimeHTML += `<tr><td>${index}</td><td>${
      state.pultosokPSW[index].name
    }</td><td>${parseInt(origBeforeFullWorkTime[index])}</td><td>${
      month[beforeMonth]
    }</td></tr>`;
  }
  document.getElementById("pultosBeforeOnOffRow").innerHTML =
    pultosokBeforeOnOfflHTML;
  //BUG: - document.getElementById('fullBeforeWorkTimeRow').innerHTML = origFullBeforeWorkTimeHTML

  //INFO:INFO:INFO:INFO:INFO:INFO:
  //NOTE:NOTE:NOTE: pultos beveetel
  let oraBevetel = 0;
  for (index = 0; index < 4; index++) {
    oraBevetel = origFullWorkTime[index]
      ? parseInt(
          parseInt(pultosHaviMindosszesen[index]) /
            parseInt(origFullWorkTime[index])
        ).toLocaleString("hu-HU", { maximumFractionDigits: 0 })
      : 0;
    pultosHTML += `<tr>
        <td>${state.pultosokPSW[index].name}</td>
        <td>${index}</td>
        <td class="text-right">${origFullWorkTime[index].toLocaleString(
          "hu-HU",
          {
            maximumFractionDigits: 0,
          }
        )}</td>
        <td class = "text-right">${pultosHaviMindosszesen[index].toLocaleString(
          "hu-HU",
          {
            maximumFractionDigits: 0,
          }
        )}</td>
        <td class = "text-right">${oraBevetel}</td>
        </tr>`;
  }
  for (index = 0; index < 4; index++) {
    oraBevetel = origBeforeFullWorkTime[index]
      ? parseInt(
          parseInt(pultosElozoHaviMindosszesen[index]) /
            parseInt(origBeforeFullWorkTime[index])
        ).toLocaleString("hu-HU", { maximumFractionDigits: 0 })
      : 0;
    pultosHTML += `<tr>
        <td>${state.pultosokPSW[index].name} előző havi</td>
        <td>${index}</td>
        <td class="text-right">${origBeforeFullWorkTime[index].toLocaleString(
          "hu-HU",
          {
            maximumFractionDigits: 0,
          }
        )}</td>
        <td class = "text-right">${pultosElozoHaviMindosszesen[
          index
        ].toLocaleString("hu-HU", {
          maximumFractionDigits: 0,
        })}</td>
        <td class = "text-right">${oraBevetel}</td>
        </tr>`;
  }
  document.getElementById("pultosStatisticRow").innerHTML = pultosHTML;
  //NOTE:NOTE:NOTE: pultos munkaidoo havi
  for (index = 0; index < 4; index++) {
    fullWorkTimeHTML += `<tr><td>${index}</td><td>${
      state.pultosokPSW[index].name
    }</td><td>${parseInt(fullWorkTime[index])}</td><td>${
      month[currentMonth]
    }</td></tr>`;
  }
  //NOTE:NOTE:NOTE: pultos munkaidoo eloozoo havi
  for (index = 0; index < 4; index++) {
    fullBeforeWorkTimeHTML += `<tr><td>${index}</td><td>${
      state.pultosokPSW[index].name
    }</td><td>${parseInt(beforeFullWorkTime[index])}</td><td>${
      month[beforeMonth]
    }</td></tr>`;
  }
  //INFO:INFO:INFO:INFO:INFO:INFO:
}
function ezresCsoportositHavi() {
  pultosHaviMindosszesen[0] = pultosHaviMindosszesen[0].toLocaleString(
    "hu-HU",
    {
      maximumFractionDigits: 0,
    }
  );
  pultosHaviMindosszesen[1] = pultosHaviMindosszesen[1].toLocaleString(
    "hu-HU",
    {
      maximumFractionDigits: 0,
    }
  );
  pultosHaviMindosszesen[2] = pultosHaviMindosszesen[2].toLocaleString(
    "hu-HU",
    {
      maximumFractionDigits: 0,
    }
  );
  pultosHaviMindosszesen[3] = pultosHaviMindosszesen[3].toLocaleString(
    "hu-HU",
    {
      maximumFractionDigits: 0,
    }
  );
}
function ezresCsoportositElozoHavi() {
  pultosElozoHaviMindosszesen[0] =
    pultosElozoHaviMindosszesen[0].toLocaleString("hu-HU", {
      maximumFractionDigits: 0,
    });
  pultosElozoHaviMindosszesen[1] =
    pultosElozoHaviMindosszesen[1].toLocaleString("hu-HU", {
      maximumFractionDigits: 0,
    });
  pultosElozoHaviMindosszesen[2] =
    pultosElozoHaviMindosszesen[2].toLocaleString("hu-HU", {
      maximumFractionDigits: 0,
    });
  pultosElozoHaviMindosszesen[3] =
    pultosElozoHaviMindosszesen[3].toLocaleString("hu-HU", {
      maximumFractionDigits: 0,
    });
}

function convertDatum(cdatum) {
  cdatum = new Date(cdatum);
  let ev = cdatum.getFullYear();
  let honap = cdatum.getMonth() + 1;
  honap = honap < 10 ? "0" + honap : honap;
  let nap = cdatum.getDate();
  nap = nap < 10 ? "0" + nap : nap;

  let cNap = `${ev}. ${honap}. ${nap}.`;
  //console.log(maiNap)
  return cNap;
  //var endFilterDate = "2099. 12. 31.";
}
