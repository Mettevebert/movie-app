"use strict";

console.log("Movie App starter...");

const movies = [
  "Inception",
  "The Matrix",
  "Interstellar",
  "The Dark Knight",
  "Pulp Fiction",
];

console.log("Alle film:", movies);

console.log("Første film:", movies[0]);
console.log("Anden film:", movies[1]);
console.log("Tredje film:", movies[2]);

const movieList = document.querySelector("#movie-list");
console.log(movieList);

for (const movie of movies) {
  const html = /* html */ `
    <article class="movie-card">
      <div class="movie-info">
        <h3>${movie}</h3>
      </div>
    </article>
  `;
  movieList.insertAdjacentHTML("beforeend", html);
}

