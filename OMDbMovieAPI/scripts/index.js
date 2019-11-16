var resetBtn = document.getElementById('reset');
var searchBtn = document.getElementById('search');
var titleInput = document.getElementById('title');
var yearInput = document.getElementById('year');
var movieContainer = document.getElementById('movieContainer');

resetBtn.addEventListener('click', () => {
    titleInput.value = '';
    yearInput.value = '';
    movieContainer.innerHTML = '';
});
searchBtn.addEventListener('click', () => {
    movieContainer.innerHTML = '';
    let title = titleInput.value;
    let year = yearInput.value;
    if (!title) {
        alert('Please enter title!');
        return;
    }
    if (year && (!/^\d{4}$/.test(year) || Number(year) < 1937 || Number(year) > 2019)) {
        alert('Incorrect year');
        return;
    }
    fetchData(title, year);
});

function fetchData(title, year) {
    let url = 'http://www.omdbapi.com/?apikey=69dfacd7';
    if (title) url += `&t=${title}`;
    if (year) url += `&y=${year}`;
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
            fillMovieContainer(data);
            fetchTrailer(data.Title);
        })
        .catch(function(e) {
            alert(e);
        });
}

function fetchTrailer(title) {
    movieTrailer(title)
    .then(function(response) {
        // console.log(response);
        let trailerUrl = response;
        let trailerAnchor = document.getElementById('trailer');
        trailerAnchor.href = trailerUrl;
        trailerAnchor.target = '_blank';
        trailerAnchor.title = 'Click to play trailer in new tab';
    })
    .catch(function(error) {
        console.log(error);
    });
}

function fillMovieContainer(data) {
    let trailerAnchor = document.createElement('a');
    trailerAnchor.id = 'trailer';
    let poster = document.createElement('img');
    poster.src = data.Poster;
    trailerAnchor.appendChild(poster);
    movieContainer.appendChild(trailerAnchor);
    let div = document.createElement('div');
    div.classList.add('movie-info');
    let pActors = document.createElement('p');
    let pDirector = document.createElement('p');
    let pYear = document.createElement('p');
    let pRating = document.createElement('p');
    pActors.innerHTML = `Actors: <em>${data.Actors}</em>`;
    pActors.classList.add('actors');
    pDirector.innerHTML = `Director: <em>${data.Director}</em>`;
    pDirector.classList.add('director');
    pYear.innerHTML = `Year: <em>${data.Year}</em>`;
    pYear.classList.add('year');
    pRating.textContent = `IMDB Rating: ${data.imdbRating}`;
    pRating.classList.add('rating');
    div.appendChild(pActors);
    div.appendChild(pDirector);
    div.appendChild(pYear);
    div.appendChild(pRating);
    movieContainer.appendChild(div);
}

