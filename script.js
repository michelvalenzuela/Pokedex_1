console.log('inicio...');

$(document).ready(function () {
    console.log('traer pokemones');

    const urlPokemons = 'https://pokeapi.co/api/v2/pokemon/';
    console.log('URL => ' + urlPokemons);

    getPokemons(urlPokemons);

    $('#getMorePokemons').click(function () {
        const urlNext = $(this).attr('nextPageUrl');
        getPokemons(urlNext);
    });
});

const getPhoto = (url, name) => {
    $.ajax({
        url: url,
        method: 'GET',
        success: function (response) {
            console.log('data pokemon', response);
            console.log(
                'foto pokemon => ' + response.sprites.other.dream_world.front_default
            );
            $(`#img_${name}`).attr(
                'src', 
                response.sprites.other.dream_world.front_default
            );
        },
    });
};

const getPokemons = (url) => {
    console.log('obteniendo pokemones desde ' + url);

    $.ajax({
        url: url, 
        method: 'GET',

        success: function (response) {
            const pokemons = response.results;
            const urlMorePokemons = response.next;

            $('#getMorePokemons').attr('nextPageUrl', urlMorePokemons);
            
            pokemons.forEach(function (pokemon) {
                showPokemon(pokemon);
            });

            $('.btnGetDataPokemon').click(function () {
                console.log('click en boton');
                const urlPokemon = $(this).attr('data-url-pokemon');
                getPokemonData(urlPokemon);
            });
        },
        error: function(error) {
            console.log(error);
        },
    });
};

const getPokemonData = (url) => {
    console.log('obteniendo datos de ' + url);

    $.ajax({
        url: url,
        method: 'GET',
        success: function (response) {
            console.log('data pokemon', response);
            $('#modalPokemonLabel').text(response.name);
            $('#pokemonType').text('');
            $('#pokemonGenerations').text('');
            $('#pokemonAbilities').text('');
            $('#pokemonMoves').text('');


            response.types.forEach(function (type) {
                $('#pokemonType').append(`<li class="">${type.type.name}</li>`);
            });

            response.game_indices.forEach(function (generation) {
                $('#pokemonGenerations').append(`<li class="">${generation.version.name}</li>`);
            });


            response.abilities.forEach(function (ability) {
                $('#pokemonAbilities').append(`<li class="">${ability.ability.name}</li>`);
            });

            for (let i = 0; i < 5; i++){
                $('#pokemonMoves').append(
                    `<li class="">${response.moves[i].move.name}</li>`
                );
            }

            $('#modalPokemon').modal('show');
        },
        error: function(error) {
            console.log(error);
        },
    });
};

const showPokemon = (pokemon) => {
    $('#pokedex').append(`
    <div class="card col-lg-3 ml-5 ">
        <div class="card-body">
            <h5 class="card-title">${pokemon.name}</h5>
            <img src="" id="img_${pokemon.name}" class="w-100">
            <button class="btn btnGetDataPokemon mt-3" data-url-pokemon="${pokemon.url}">¡Quiero saber más de este Pokémon!</button>
        </div>
    </div>
    `);
getPhoto(pokemon.url, pokemon.name);
};

