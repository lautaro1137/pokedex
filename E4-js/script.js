const URL = "https://pokeapi.co/api/v2/pokemon/";

const searchInput = document.getElementById("search");
const pokedexContainer = document.getElementById("pokedex");

function showError(message) {
  pokedexContainer.innerHTML = `<p class="error">${message}</p>`;
}

async function searchPokemon() {
  const searchedPokemon = searchInput.value.toLowerCase();

  try {
    const response = await fetch(URL + searchedPokemon);
    if (!response.ok) {
      showError(`No se encontró su Pokémon"${searchedPokemon}"`);
      return;
    }

    const data = await response.json();

    pokedexContainer.innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Número: ${data.id}</p>
            <p>Altura: ${data.height / 10}m</p>
            <p>Peso: ${data.weight / 10}km</p>
        `;
  } catch (error) {
    showError("Ha ocurrido un error al buscar el Pokémon");
    console.error(error);
  }
}

document.querySelector("button").addEventListener("click", searchPokemon);
