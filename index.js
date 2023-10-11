const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const errorMessage = document.getElementById('error-message');
getMovies(API_URL);


function showErrorMessage() {
    errorMessage.style.display = 'block';
}

// Function to hide error message
function hideErrorMessage() {
    errorMessage.style.display = 'none';
}

async function getMovies(url){
        try {
            const res = await axios.get(url);
            const info = res.data;
            console.log(info);
            if (info.results.length === 0) {
                // Display the error message
                errorMessage.style.display = 'block';
                showMovies().remove();
              } else {
                // Hide the error message if there are search results
                errorMessage.style.display = 'none';
                showMovies(info.results);
              }
        } catch (error) {
            console.log(error);  
}
}

function showMovies(info){
        main.innerHTML = "";
        info.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        
        <img src="${IMG_URL + poster_path}" alt="${title}">

        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        
        `;

        main.appendChild(movieEl);
    });
}

function getColor(vote){
    if(vote >= 8){
        return `green`;
    }else if(vote >= 5){
        return `orange`;
    }else{
        return `red`;
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm);
    }else{
        getMovies(API_URL);
    }
})

search.addEventListener("input", () => {
    const searchTerm = search.value;
    if (!searchTerm) {
        hideErrorMessage();
        getMovies(API_URL);
    }
});