var moviesContainer = document.getElementById('moviesContainer');
var charactersContainer = document.getElementById('charactersContainer');

var moviesCharacters = {};
fetchMovies();


function fetchMovies() {
    let url = 'https://swapi.co/api/films';
    const myInit = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        withCredentials: false
    };
    const myRequest = new Request(url, myInit);
    fetch(myRequest)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            let movies = data.results;
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

function addCharactersDOM(characters) {
    charactersContainer.innerHTML = '';
    characters.forEach(character => {
        var divCharacter = document.createElement('div');
        divCharacter.textContent = character.name;
        divCharacter.classList.add('character');
        divCharacter.classList.add('card');
        divCharacter.classList.add('mt-3');
        divCharacter.classList.add('pt-2');
        divCharacter.classList.add('pl-2');
        divCharacter.classList.add('pb-2');
        charactersContainer.appendChild(divCharacter);
    });
}





