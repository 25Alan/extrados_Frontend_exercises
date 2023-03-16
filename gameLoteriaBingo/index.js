const inputNumberPlayers = document.querySelector("#inputNumberPlayers");
const buttonNumberRandom = document.querySelector("#buttonNumberRandom");
const tableInfo = document.querySelector("#tableInfo");
const containerPlayers = document.querySelector("#containerPlayers");
const containerInfo = document.querySelector("#containerInfo");
let numbersRandomPlayers = [];
let numbersGenerated = [];

window.onload = () => {
  inputNumberPlayers.addEventListener("input", () => {
    containerPlayers.innerHTML = ``;
    createXtimes(inputNumberPlayers.value);
  });
  buttonNumberRandom.addEventListener("click", () => {
    containerInfo.innerHTML = ``;
    buttonNumberRandom.textContent = numberRandom();
    if (!checkRepeated(buttonNumberRandom.textContent))
      numbersGenerated.push(buttonNumberRandom.textContent);
    checkCardboard(buttonNumberRandom.textContent);
    createCardboard("Check", -1, "Check");
    for (let i = 0; i < inputNumberPlayers.value; i++) {
      console.log(checkWinner(i + 1));
      if (checkWinner(i) === 15) winner(`Ganador: tabla ${i + 1}`);
    }
  });
};

function createCardboard(check, numberTable, namePlayer = "Player") {
  const table = document.createElement("table");
  const caption = document.createElement("caption");
  const tbody = document.createElement("tbody");
  table.classList.add("table","table-bordered","border-info","text-dark","fw-bold");
  caption.classList.add("bg-transparent", "text-center");
  caption.textContent = namePlayer;
  tbody.classList.add("text-center");

  function createRowsColumns(rows, cols, value) {
    let count = 0;
    for (let i = 0; i < rows; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < cols; j++) {
        const td = document.createElement("td");
        td.textContent = value[count] !== undefined ? value[count] : "";
        count++;
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  }
  if (check === "noCheck") {
    completeNumbers();
    createRowsColumns(3, 5, numbersRandomPlayers);
    numbersRandomPlayers = [];
    table.setAttribute("id", `table${numberTable}`);
    table.appendChild(caption);
    table.appendChild(tbody);
    containerPlayers.appendChild(table);
  } else if (check === "Check") {
    createRowsColumns(6, 15, numbersGenerated);
    table.appendChild(caption);
    table.appendChild(tbody);
    containerInfo.appendChild(table);
  }
}

function createXtimes(numbersPlayers = 2) {
  for (let i = 0; i < numbersPlayers; i++) {
    createCardboard("noCheck", i, `Player ${i + 1}`);
  }
}

function checkCardboard(number) {
  const tdAll = document.querySelectorAll("td");
  for (let i = 0; i < tdAll.length; i++) {
    if (tdAll[i].textContent === number)
      tdAll[i].style.backgroundColor = "rgb(255, 255, 255)";
  }
}

function checkWinner(numberTable) {
  const tdAll = document.querySelectorAll(`#table${numberTable} td`);
  let countWhite = 0;
  for (let i = 0; i < tdAll.length; i++) {
    if (tdAll[i].style.backgroundColor === "rgb(255, 255, 255)") countWhite++;
  }
  return countWhite;
}

function winner(string) {
  const winner = document.querySelector(".winner");
  const h1 = document.querySelector(".winner .box h1");
  winner.classList.remove("d-none");
  h1.textContent = string;
}

const numberRandom = () => {
  return Math.floor(Math.random() * 90) + 1;
};
const completeNumbers = () => {
  while (numbersRandomPlayers.length < 15) {
    let random = numberRandom();
    if (!numbersRandomPlayers.includes(random)) {
      numbersRandomPlayers.push(random);
    }
  }
};
const checkRepeated = (number) => { return numbersGenerated.includes(number); };