const isearch = document.querySelector("#Isearch");
const buttonSearch = document.querySelector("#buttonSearch");
const containerShow = document.querySelector("#containerShow");
const table = document.querySelector("table");
const tbody = document.createElement("tbody");
const div = document.createElement("div");
let pokemonArray = [];
let pokemonNames = [];

window.onload = async () => {
  await getAllPokemon();
  console.log(pokemonArray);
  isearch.addEventListener("input", () => {
    const searchString = isearch.value.toLowerCase();
    const filteredNames = filterPokemonNames(searchString);
    updateAutocompleteList(filteredNames);
  });
  buttonSearch.addEventListener("click", () => {
    searchPokemon(isearch.value.toLowerCase());
  });
};

export async function getAllPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon";

  while (url) {
    const response = await fetch(url);
    const data = await response.json();
    pokemonArray = [...pokemonArray, ...data.results];
    url = data.next;
  }
  pokemonNames = pokemonArray.map((pokemon) => pokemon.name);

  return pokemonArray;
}

const filterPokemonNames = (searchString) => pokemonNames.filter((name) => name.startsWith(searchString));

const updateAutocompleteList = (filteredNames) => {
  const datalist = document.querySelector("#pokemonNames");
  datalist.innerHTML = filteredNames.map((name) => `<option value="${name}"></option>`).join("");
};

function searchPokemon(name) {
  const pokemonSelect = pokemonArray.find((x) => x.name === name);
  pokemonInfo(pokemonSelect.name, pokemonSelect.url);
}

export async function pokemonInfo(name, url) {
  try {
    const response = await fetch(`${url}`);
    const data = await response.json();
    const height = data.height;
    const weight = data.weight;
    const types = data.types.map((type) => type.type.name);
    const image = data.sprites.other.dream_world.front_default;
    return showPokemon(name, image, height, weight, types);
  } catch (err) {
    console.log(`Failed ${err}`);
  }
}

function showPokemon(name, image, height, weight, types) {
  tbody.innerHTML = ``;
  div.innerHTML = ``;
  div.setAttribute(
    "class",
    "d-flex flex-column container text-center justify-content-center align-items-center"
  );
  div.innerHTML = `
  <h1 class="display-3">${name}</h1>
  <img src="${image}" alt="${name}">`;
  containerShow.appendChild(div);
  containerShow.setAttribute("class", "container border mt-5");
  tbody.innerHTML = `
  <tr><th scope="row">Type</th><td>${types}</td></tr>
  <tr><th scope="row">Height</th><td>${height}</td></tr>
  <tr><th scope="row">Weight</th><td>${weight} k</td></tr>`;
  table.appendChild(tbody);
  containerShow.appendChild(table);
}