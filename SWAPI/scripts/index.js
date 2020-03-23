var moviesContainer = document.getElementById('moviesContainer');
var charactersContainer = document.getElementById('charactersContainer');
var characterInfoContainer = document.getElementById('characterInfoContainer');

var moviesCharacters = {};
var charactersInfo = {};
fetchMovies();


function fetchMovies() {
    var url = 'https://swapi.co/api/films';
    var myInit = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        withCredentials: false
    };
    var myRequest = new Request(url, myInit);
    fetch(myRequest)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            var movies = data.results;
            addMoviesDOM(movies);
        })
        .catch(function(e) {
            alert(e);
        });
}

function fetchCharacters(urls) {
    // console.log(urls);
    Promise.all(urls.map(url => fetch(url)))
        .then(responses => Promise.all(responses.map(res => res.text())))
        .then(texts => {
            // console.log(texts);
            addCharactersDOM(texts.map(JSON.parse));
        });

}

function addMoviesDOM(movies) {
    movies.forEach(movie => {
        var divMovie = document.createElement('div');
        divMovie.textContent = movie.title;
        divMovie.setAttribute('id', movie.episode_id);
        divMovie.setAttribute('title', 'Click to see characters');
        divMovie.classList.add('movie');
        divMovie.classList.add('card');
        divMovie.classList.add('mt-3');
        divMovie.classList.add('pt-2');
        divMovie.classList.add('pl-2');
        divMovie.classList.add('pb-2');
        moviesContainer.appendChild(divMovie);
        // add charactes apis to moviesCharacters dictionary
        moviesCharacters[movie.episode_id] = movie.characters;
    });
    var moviesDivs = document.querySelectorAll('.movie');
    moviesDivs.forEach(div => {
        div.addEventListener('click', onClickMovie);
    });
}

function onClickMovie(ev) {
    // console.log(ev);
    var movieElement = ev.target;
    var movieId = movieElement.id;
    var characters = moviesCharacters[movieId];
    fetchCharacters(characters);
}

function onClickCharacter(ev) {
    // console.log(ev);
    var characterElement = ev.target;
    var characterName = characterElement.id;
    var characterInfo = charactersInfo[characterName];
    console.log(characterInfo);
    characterInfoContainer.innerHTML = '';
    var content = `<p class="character-info mt-3 pt-2 pl-2 pb-2">Name: ${characterInfo.name}</p>`;
    content += `<p class="character-info mt-3 pt-2 pl-2 pb-2">Birth year: ${characterInfo.birth_year}</p>`;
    content += `<p class="character-info mt-3 pt-2 pl-2 pb-2">Height: ${characterInfo.height}</p>`;
    content += `<p class="character-info mt-3 pt-2 pl-2 pb-2">Mass: ${characterInfo.mass}</p>`;
    content += `<p class="character-info mt-3 pt-2 pl-2 pb-2">Eye color: ${characterInfo.eye_color}</p>`;
    content += `<p class="character-info mt-3 pt-2 pl-2 pb-2">Hair color: ${characterInfo.hair_color}</p>`;
    content += `<p class="character-info mt-3 pt-2 pl-2 pb-2">Skin color: ${characterInfo.skin_color}</p>`;
    characterInfoContainer.innerHTML = content;
    var divCharacterInfo = document.createElement('div');
    divCharacter.classList.add('character-info-container');
    divCharacter.classList.add('card');
    divCharacter.classList.add('mt-3');
    divCharacter.classList.add('pt-2');
    divCharacter.classList.add('pl-2');
    divCharacter.classList.add('pb-2');
    charactersContainer.appendChild(divCharacterInfo);
}

function addCharactersDOM(characters) {
    // console.log(characters);
    charactersContainer.innerHTML = '';
    characters.forEach(character => {
        var divCharacter = document.createElement('div');
        divCharacter.textContent = character.name;
        divCharacter.setAttribute('id', character.name);
        divCharacter.classList.add('character');
        divCharacter.classList.add('card');
        divCharacter.classList.add('mt-3');
        divCharacter.classList.add('pt-2');
        divCharacter.classList.add('pl-2');
        divCharacter.classList.add('pb-2');
        charactersContainer.appendChild(divCharacter);
        // add character info to charactersInfo dictionary
        charactersInfo[character.name] = character;
    });
    var charactersDivs = document.querySelectorAll('.character');
    charactersDivs.forEach(div => {
        div.addEventListener('click', onClickCharacter);
    });
}





