import { pokemonInfo } from "./script.js";

const iLimit = document.querySelector("#iLimit");
const selectFilter = document.querySelector('#selectFilter');
const sectionContainerList = document.querySelector("#sectionContainerList");
const textSearchFavorite = document.querySelector("#textSearchFavorite");
const buttonPrev = document.querySelector("#buttonPrev");
const buttonNext = document.querySelector("#buttonNext");
let url = "https://pokeapi.co/api/v2/";
let currentPage = 1;
let pageSize = 5;

window.onload = async () => {
  selectFilter.addEventListener("change", async(event) => {
    const filter = event.target.value;
    await updateList(filter);
  });
  iLimit.addEventListener("input", async () => {
    pageSize = iLimit.value;
    await updateList();
  });
  buttonPrev.addEventListener("click", () => {
    currentPage--;
    buttonPrev.classList.toggle('d-none', currentPage <= 1);
    updateList();
  });
  buttonNext.addEventListener("click", () => {
    currentPage++;
    buttonPrev.classList.remove('d-none');
    updateList();
  });
};

async function updateList(filter) {
  sectionContainerList.innerHTML = "";
  const offset = (currentPage - 1) * pageSize;
  if (filter === 'all') url += `pokemon/?limit=${pageSize}&offset=${offset}`;
  else url += `type/${filter}`;
  try {
    const response = await fetch(`${url}`);
    const { results } = await response.json();
    results.forEach(({ name, url }) => {
      showList(capitalLetter(name), url);
    });
  } catch (err) {
    console.log(`Failed: ${err}`);
  }
}

function showList(namePokemon, urlPokemon) {
  const ul = document.createElement("ul");
  const li = document.createElement("li");

  ul.setAttribute("class", "list-group mt-3 text-center pe-5");
  li.setAttribute(
    "class",
    "list-group-item list-group-item-warning rounded mt-1 border shadow-sm px-0 py-1 hand"
  );
  li.setAttribute("data-url", urlPokemon);
  li.textContent = namePokemon;
  ul.appendChild(li);
  sectionContainerList.appendChild(ul);

  ul.addEventListener("click", (event) => {
    console.log(event.target.textContent);
    console.log(event.target.dataset.url);
    textSearchFavorite.classList.add("d-none");
    pokemonInfo(namePokemon, urlPokemon);
  });
}

function capitalLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}