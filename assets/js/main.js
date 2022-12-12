const pokemonList = document.getElementById('pokemonList')
const newPage = document.getElementById('newPage')
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLiIndex(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>

        <span id="${pokemon.number}" class="name">@${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </li>
    `
}

function convertPokemonToLiInfoPage(pokemon) {
    return `
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Informações </title>

    <!-- Normalize CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Font Roboto -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap" rel="stylesheet">

    <!-- Nosso CSS -->
    <link rel="stylesheet" href="/assets/css/global.css">
    <link rel="stylesheet" href="/assets/css/info-page.css">
</head>

<body>
    <section class="content ${pokemon.type}">
        <div class="infos">

            <ol class="menuBar">
                <a href="index.html">
                    <li id="pokemonList"> ← </li>
                </a>
                <li> ♡ </li>
            </ol>

            <div class="pokemon">
                    
                <div class="details">
                    <div>
                        <span class="name">${pokemon.name}</span>
                            <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                    </div>
                    <span class="number">#${pokemon.number}</span>
                </div>

                <img src="${pokemon.photo}" alt="${pokemon.name}">

            </div>
        </div>


        <div class="pokemonDetails">

            <ol class="subMenu">
                <li class="bold">
                    About
                </li>
                <li class="opacity">
                    Base Stats
                </li>
                <li class="opacity">
                    Evolution
                </li>
                <li class="opacity">
                    Movies
                </li>
            </ol>
            <hr>

            <ol class="pokemonAbout">
                <ol class="about">
                    <li class="specie">
                        Specie
                    </li>
                    <li>
                        ${pokemon.specie}
                    </li>
                </ol>
                <ol class="about">
                    <li class="heigth">
                        Heigth
                    </li>
                    <li>
                        ${pokemon.height} cm
                    </li>
                </ol>
                <ol class="about">
                    <li class="weight">
                        Weight
                    </li>
                    <li>
                        ${pokemon.weight} Kg
                    </li>
                </ol>
                <ol class="about">
                    <li class="abilits">
                        Abilits
                    </li>
                    <li>
                        ${pokemon.abilities}
                    </li>
                </ol>
            </ol>
        </div>
    </section>

    <!-- Nosso JS -->
    <script src="/assets/js/pokemon-model.js"></script>
    <script src="/assets/js/poke-api.js"></script>
    <script src="/assets/js/main.js"></script>
</body>
</html>
    `
}


pokemonList.addEventListener('click', (e) => {
    const id = e.target.id
    function loadPokemonInfo() {
        pokeApi.getPokemonInfoPage(id).then((pokemon) => {
            const newHtml = convertPokemonToLiInfoPage(pokemon)
            newPage.innerHTML = newHtml
        })
    }
    loadPokemonInfo(id)
})


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLiIndex).join('')
        pokemonList.innerHTML += newHtml
    })
}
loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
