"use strict";

console.log("Movie App starter...");

const MOVIES_URL =
  "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json";
let allMovies = [];
const movieList = document.querySelector("#movie-list");
const genreSelect = document.querySelector("#genre-select");
const searchInput = document.querySelector("#search-input");
const movieCount = document.querySelector("#movie-count");

fetchMovies();

async function fetchMovies() {
  const response = await fetch(MOVIES_URL);
  allMovies = await response.json();

  populateGenreSelect();
  applyFilters();
}

function populateGenreSelect() {
  genreSelect.innerHTML = '<option value="all">Alle genrer</option>';

  const genres = new Set();
  const counts = {};

  for (const movie of allMovies) {
    for (const genre of movie.genre) {
      genres.add(genre);
      counts[genre] = (counts[genre] || 0) + 1;
    }
  }

  const sortedGenres = [...genres].sort((a, b) => a.localeCompare(b));

  for (const genre of sortedGenres) {
    const label = `${genre} (${counts[genre]})`;
    genreSelect.insertAdjacentHTML(
      "beforeend",
      `<option value="${genre}">${label}</option>`,
    );
  }
}

function applyFilters() {
  const selectedGenre = genreSelect.value;
  const searchValue = searchInput.value.trim().toLowerCase();

  if (selectedGenre === "all") {
    showMovies(allMovies);
    return;
  }

  const filteredMovies = allMovies.filter(function (movie) {
    const matchesGenre = movie.genre.includes(selectedGenre);
        selectedGenre === "all" || movie
    const matchesSearch = movie.title.toLowercase().includes(searchValue);

    return matchesGenre && matchesSearch;
  });

  showMovies(filteredMovies);
}

function showMovies(movies) {
  movieList.innerHTML = "";

  for (const movie of movies) {
    showMovie(movie);
  }

  movieCount.textContent = `Viser ${movies.length} film`;
}

function showMovie(movie) {
  const highlightClass = movie.rating >= 8.5 ? "movie-card--highlight" : "";

  const html = /* html */ `
    <article class="movie-card ${highlightClass}">
      <img class="movie-image" src="${movie.image}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>År: ${movie.year}</p>
        <p>Rating: ${movie.rating}</p>
        <p>Genre: ${movie.genre}</p>
      </div>
    </article>
  `;

  movieList.insertAdjacentHTML("beforeend", html);
}

  genreSelect.addEventListener("change", applyGenreFilter);
  searchInput.addEventListener("input", applyFilters);
