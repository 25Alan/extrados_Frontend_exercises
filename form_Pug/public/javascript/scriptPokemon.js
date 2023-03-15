const table = document.querySelector("#table");
const iNumberlimit = document.querySelector("#iNumberLimit");
const btnPrev = document.querySelector("#btnPrev");
const btnNext = document.querySelector("#btnNext");

let currentPage = 1;
let pageSize = 10;

iNumberlimit.addEventListener("input", () => {
  pageSize = iNumberlimit.value;
  updateTable();
});

btnPrev.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateTable();
  }
});

btnNext.addEventListener("click", () => {
  currentPage++;
  updateTable();
});

function addPokemonTable(number, name, url) {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `<th scope='row'>${number}</th><td>${name}</td><td>${url}</td>`;
  table.appendChild(newRow);
}

async function updateTable() {
  table.innerHTML = "";
  const offset = (currentPage - 1) * pageSize;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`);
    const { results } = await response.json();
    results.forEach(({ name, url }, i) => addPokemonTable(i + offset + 1, name, url));
  } catch (err) {
    console.log(`Failed: ${err}`);
  }
}

updateTable();