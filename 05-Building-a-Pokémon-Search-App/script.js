/*
Algorithm:

1. available pokemons:
    fetch api-endpoint and show id and name (store in localStorage if needed)

2. search area:
    take input, and check if number or name
    let add male female symbol, letter or word at end
    sanitize the input to lowercase, dashed sep
    fetch with api, store and show results

    if name or id invalid give alert

3. display area:
    destructure fetched data and assign and return to the page
    for every search clear #types and render

4. slide show of images:
    for now only display front-default with id sprite
*/

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonImage = document.getElementById("image");
const pokemonTypes = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSplAttack = document.getElementById("special-attack");
const pokemonSplDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const pokemonAvailable = document.getElementById("avbl-pokemon-table");
const pokemonCount = document.getElementById("total-pokemon-count");

let totalPokemons;

const showPokemonData = async (searchQuery) => {
    try {

        const pokemonDataPromise = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchQuery}`);

        if (showPokemonData.ok) {
            throw new Error(showPokemonData);
        }

        const pokemonDataJson = await pokemonDataPromise.json();

        const {
            name,
            id,
            weight,
            height,
            sprites,
            stats,
            types
        } = pokemonDataJson;

        pokemonName.innerText = `Name: ${name.toUpperCase()}`;
        pokemonId.innerText = `#${id}`;
        pokemonWeight.innerText = `Weight: ${weight}`;
        pokemonHeight.innerText = `Height: ${height}`;

        pokemonHp.innerText = stats[0].base_stat;
        pokemonAttack.innerText = stats[1].base_stat;
        pokemonDefense.innerText = stats[2].base_stat;
        pokemonSplAttack.innerText = stats[3].base_stat;
        pokemonSplDefense.innerText = stats[4].base_stat;
        pokemonSpeed.innerText = stats[5].base_stat;

        pokemonImage.innerHTML = `<img src="${sprites.front_default}" id="sprite">`;

        const colors = ["#1C1C1C", "#2E8B57", "#4B0082", "#A52A2A", "#D2691E", "#4682B4", "#8B0000", "#5F9EA0", "#FF6347", "#6A5ACD", "#B22222", "#8B008B"];
        for (let obj of types) {
            const color = Math.floor(Math.random() * 11)
            pokemonTypes.innerHTML += `<p class="type-box" style="background-color: ${colors[color]}">${obj.type.name}</p>`;
        }
    } catch (err) {
        alert("Pokémon not found");
    }
}

const searchSanitize = query => {
    /*
    take input, and check if number or name
    let add male female symbol, letter or word at end
    sanitize the input to lowercase, dashed sep
    fetch with api, store and show results

    if name or id invalid give alert
    */

    /*
    possible input:
    10
    pikachu
    pikachu m
    pikachu male
    pikachu ♀ or ♂
    
    PiKachU
    pikachu-m
    pikachu-male
    pikachu20

    */

    try {
        const digRegex = /^\d+$/g;
        const charRegex = /^[A-Za-z]+/g;
        const dashSepRegex = /^[A-Za-z]+[-]?[A-Za-z]$/g;
        const symbolRegex = /^[A-Za-z]+[♀♂]?$/g;

        if (digRegex.test(query)) {
            showPokemonData(query);
        } else if (charRegex.test(query) || dashSepRegex.test(query)) {
            query = query.toLowerCase();
            query = query.replace(/\s/, "-");
            showPokemonData(query);
        } else if (symbolRegex.test(query)) {
            query = query.toLowerCase();
            if (query.endsWith("♀")) {
                query = query.replace(/♀/, "-m");
            } else if (query.endsWith("♂")) {
                query = query.replace(/♂/, "-f");
            }
            showPokemonData(query);
        } else {
            alert("Invalid Pokémon Name");
        }

    } catch (err) {
        alert("Something wrong in the name: ", err);
    }

}

const displayAvblPokemonData = async () => {
    const pokemonDataPromise = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
    const pokemonDataJson = await pokemonDataPromise.json();
    totalPokemons = pokemonDataJson.count;
    pokemonCount.innerText = totalPokemons;

    for (let i = 0; i < totalPokemons; i++) {
        pokemonAvailable.innerHTML += `<tr><td>${pokemonDataJson.results[i].id}</td><td>${pokemonDataJson.results[i].name}</td></tr>`
    }
}

displayAvblPokemonData();

searchButton.addEventListener("click", e => {
    e.preventDefault();
    pokemonTypes.innerHTML = "";
    searchSanitize(searchInput.value);
})

searchButton.addEventListener("keydown", e => {
    e.preventDefault();
    pokemonTypes.innerHTML = "";
    searchSanitize(searchInput.value);
})

window.onload = () => {
    searchInput.value = "";
};
