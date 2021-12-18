const pokedex = document.getElementById("pokedex"),
  pokedexChilds = Array.from(pokedex.children),
  pokedexLength = pokedexChilds.length;

let pokemonsNameArray = [],
  pokemonsIdArray = [];

// const colors = {
//   normal: "#A8A77A",
//   fire: "#EE8130",
//   water: "#6390F0",
//   electric: "#F7D02C",
//   grass: "#7AC74C",
//   ice: "#96D9D6",
//   fighting: "#C22E28",
//   poison: "#A33EA1",
//   ground: "#E2BF65",
//   flying: "#A98FF3",
//   psychic: "#F95587",
//   bug: "#A6B91A",
//   rock: "#B6A136",
//   ghost: "#735797",
//   dragon: "#6F35FC",
//   dark: "#705746",
//   steel: "#B7B7CE",
//   fairy: "#D685AD",
// };

async function createPokemonsNameArray() {
  await consultPokemons(pokedexLength);

  let pokemonsName = pokedex.querySelectorAll(".pokemon__name");
  pokemonsName = Array.from(pokemonsName);
  for (let pokemonName of pokemonsName) {
    pokemonsNameArray.push(pokemonName.textContent.toLowerCase());
  }
}

async function consultPokemon(id) {
  try {
    const pokemon = await fetchData(`https://pokeapi.co/api/v2/pokemon/${id}`);
    // console.log(pokemon);
    createPokemon(pokemon, id);
  } catch {
    console.error(error);
  }
}

async function consultPokemons(numPokemons) {
  for (i = 0; i < numPokemons; i++) {
    await consultPokemon(i + 1);
  }
}
// window.onload = consultPokemons(pokedexLength);

function createPokemon(pokemon, id) {
  let thisPokemon = pokedexChilds[id - 1];
  let itemId = thisPokemon.querySelector(".pokemon__id");
  let itemImg = thisPokemon.querySelector(".pokemon__img");
  let itemName = thisPokemon.querySelector(".pokemon__name");
  let itemTypeCtn = thisPokemon.querySelector(".pokemon__type");

  itemId.textContent = `#${elegantId(pokemon.id)}`;

  let src;
  let imageUrl1 = pokemon.sprites.other.dream_world.front_default;
  let imageUrl2 = pokemon.sprites.other.home.front_default;
  let imageUrl3 = pokemon.sprites.other["official-artwork"].front_default;

  if (imageUrl1 !== null) {
    src = imageUrl1;
  } else if (imageUrl2 !== null) {
    src = imageUrl2;
  } else if (imageUrl3 !== null) {
    src = imageUrl3;
  }

  itemImg.setAttribute("src", src);

  itemName.textContent = `${capitalizeString(pokemon.species.name)}`;

  let type = document.createElement("div");
  itemTypeCtn.appendChild(type);
  let type1 = pokemon.types[0].type.name;
  type.textContent = `${capitalizeString(type1)}`;
  backgroundType(type);

  let type2;
  if (pokemon.types[1]) {
    let type = document.createElement("div");
    itemTypeCtn.appendChild(type);
    type2 = pokemon.types[1].type.name;
    type.textContent = `${capitalizeString(type2)}`;
    backgroundType(type);
  }

  let totalLength;
  if (type2) {
    totalLength = type1.length + type2.length;
  } else {
    totalLength = type1.length;
  }

  if (totalLength >= 12) {
    itemTypeCtn.style.padding = "0";
  }
  if (totalLength >= 15) {
    let arrayTypes = Array.from(itemTypeCtn.children);
    for (type of arrayTypes) {
      type.style.padding = "4px 8px";
    }
  }
}

function createPokemonIdArray(numPokemons) {
  for (let i = 1; i <= numPokemons; i++) {
    pokemonsIdArray.push(String(i));
  }
}
console.log(pokemonsIdArray);

function createNewPokemonItem(pokemon) {
  let itemContainer = document.createElement("li");
  let itemBg = document.createElement("div");
  let item = document.createElement("div");
  let itemId = document.createElement("p");
  let itemImg = document.createElement("img");
  let itemName = document.createElement("p");
  let itemTypeCtn = document.createElement("div");

  pokedex.appendChild(itemContainer);
  itemContainer.appendChild(itemBg);
  itemBg.appendChild(item);
  item.appendChild(itemId);
  item.appendChild(itemImg);
  item.appendChild(itemName);
  item.appendChild(itemTypeCtn);

  itemContainer.classList.add("pokedex__item");
  itemBg.classList.add("bg-pokemon");
  item.classList.add("pokemon");
  itemId.classList.add("pokemon__id");
  itemImg.classList.add("pokemon__img");
  itemName.classList.add("pokemon__name");
  itemTypeCtn.classList.add("pokemon__type");

  itemId.textContent = `#${elegantId(pokemon.id)}`;
  itemImg.setAttribute(
    "src",
    `${pokemon.sprites.other.dream_world.front_default}`
  );
  itemName.textContent = `${capitalizeString(pokemon.name)}`;

  // console.log(`${pokemon.name}, N° de tipos: ${pokemon.types.length}`);

  let type = document.createElement("div");
  itemTypeCtn.appendChild(type);
  let type1 = pokemon.types[0].type.name;
  itemTypeCtn.children[0].textContent = `${capitalizeString(type1)}`;
  backgroundType(itemTypeCtn.children[0]);

  let type2;
  if (pokemon.types[1]) {
    let type = document.createElement("div");
    itemTypeCtn.appendChild(type);
    type2 = pokemon.types[1].type.name;
    itemTypeCtn.children[1].textContent = `${capitalizeString(type2)}`;
    backgroundType(itemTypeCtn.children[1]);
  }

  let totalLength;
  if (type2) {
    totalLength = type1.length + type2.length;
  } else {
    totalLength = type1.length;
  }
  if (totalLength >= 12) {
    // console.log(`${pokemon.name} ${type1}, ${type2}, ${totalLength}`);
    itemTypeCtn.style.padding = "0";
  }
}

function numPokemonsPokeapi() {
  let numPokemons = 898;
  console.log(`N° de Pokemones en Pokeapi: ${numPokemons}`);
}

createPokemonsNameArray();
createPokemonIdArray(pokedexLength);

numPokemonsPokeapi();