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
    if(!checkRepeated(buttonNumberRandom.textContent)) numbersGenerated.push(buttonNumberRandom.textContent);
    checkCardboard(buttonNumberRandom.textContent);
    createCardboard("Check", "Check");
    for(let i = 0; i < inputNumberPlayers.value; i++){
      console.log(checkWinner(i+1));
      if(checkWinner(i) === 15) console.log(`Ganador: tabla ${i+1}`);
    }
  });
};

function createCardboard(check, numberTable, namePlayer = "Player") {
  const table = document.createElement("table");
  const caption = document.createElement("caption");
  const tbody = document.createElement("tbody");

  table.setAttribute(
    "class",
    "table table-bordered border-info text-dark fw-bold"
  );
  caption.setAttribute("class", "bg-transparent text-center");
  caption.textContent = namePlayer;
  tbody.setAttribute("class", "text-center");

  if (check === "noCheck") {
    completeNumbers();
    let count = 0;
    for (let i = 0; i < 3; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < 5; j++) {
        const td = document.createElement("td");
        td.textContent = `${numbersRandomPlayers[count]}`;
        count++;
        tr.appendChild(td);
        tbody.appendChild(tr);
      }
    }
    numbersRandomPlayers = [];
    table.appendChild(caption);
    table.setAttribute('id', `table${numberTable}`);
    table.appendChild(tbody);
    containerPlayers.appendChild(table);
  }
  if (check === "Check") {
    let count2 = 0;
    for (let i = 0; i < 6; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < 15; j++) {
        const td = document.createElement("td");
        if (numbersGenerated[count2] === undefined) {
          td.textContent = ``;
        } else {
          td.textContent = `${numbersGenerated[count2]}`;
        }
        count2++;
        tr.appendChild(td);
        tbody.appendChild(tr);
      }
    }
    table.appendChild(caption);
    table.appendChild(tbody);
    containerInfo.appendChild(table);
  }
}

function createXtimes(numbersPlayers = 2) {
  for (let i = 0; i < numbersPlayers; i++) {
    createCardboard("noCheck",i , `Player ${i + 1}`);
  }
}

function checkCardboard(number) {
  const tdAll = document.querySelectorAll('td');
  tdAll.forEach(td => {
    if(td.textContent === number) td.style.backgroundColor = 'rgb(255, 255, 255)';
  });
}

function checkWinner(numberTable) {
  const tdAll = document.querySelectorAll(`#table${numberTable} td`)
  let countWhite = 0;
  tdAll.forEach(td => {
    if(td.style.backgroundColor === 'rgb(255, 255, 255)') countWhite++;
  });
  return countWhite;
}

const numberRandom = () => { return Math.trunc(Math.random() * (90 - 1) + 1); };
const completeNumbers = () => {
  while (numbersRandomPlayers.length < 15) {
    let random = numberRandom();
    if (!numbersRandomPlayers.includes(random)) {
      numbersRandomPlayers.push(random);
    }
  }
};
const checkRepeated = (number) => { return numbersGenerated.indexOf(number) !== -1; };