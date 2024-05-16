document.addEventListener("DOMContentLoaded", async () => {
    // Cargar películas y géneros al cargar la página
    loadMovies();
    loadGenres();

    // Agregar event listener al combobox para filtrar por género
    const genreSelect = document.getElementById("genreSelect");
    genreSelect.addEventListener("change", filterByGenre);
});

async function loadGenres() {
    const response = await fetch("http://127.0.0.1:5000/movies");
    const movies = await response.json();

    const genreSelect = document.getElementById("genreSelect");
    const genres = new Set(); // Usar un conjunto para evitar géneros duplicados

    // Obtener todos los géneros de las películas y agregarlos al conjunto
    movies.forEach(movie => genres.add(movie.genre));

    // Llenar el combobox con los géneros
    genres.forEach(genre => {
        const option = document.createElement("option");
        option.textContent = genre;
        option.value = genre;
        genreSelect.appendChild(option);
    });
}

async function loadMovies() {
    const response = await fetch("http://127.0.0.1:5000/movies");
    const movies = await response.json();

    const movieGrid = document.getElementById("movieGrid");
    movieGrid.innerHTML = ""; // Limpiar contenido existente

    movies.forEach((movie, index) => {
        if (index % 3 === 0) {
            movieGrid.innerHTML += '<div class="w-100"></div>'; // Divisor de fila
        }

        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4"); // Colocar la tarjeta en una columna de 4 y agregar un margen inferior

        card.innerHTML = `
            <div class="card" onclick="viewMovieDetails(${movie.id})">
                <img src="${movie.poster}" class="card-img-top" alt="${movie.name}">
                <div class="card-body">
                    <h5 class="card-title">${movie.name}</h5>
                </div>
            </div>
        `;
        movieGrid.appendChild(card);
    });
}

async function filterByGenre() {
    const genreSelect = document.getElementById("genreSelect");
    const selectedGenre = genreSelect.value;

    if (selectedGenre === "todos") {
        loadMovies();
    } else {
        const response = await fetch("http://127.0.0.1:5000/movies");
        const movies = await response.json();

        const filteredMovies = movies.filter(movie => movie.genre === selectedGenre);

        const movieGrid = document.getElementById("movieGrid");
        movieGrid.innerHTML = ""; // Limpiar contenido existente

        filteredMovies.forEach((movie, index) => {
            if (index % 3 === 0) {
                movieGrid.innerHTML += '<div class="w-100"></div>'; // Divisor de fila
            }

            const card = document.createElement("div");
            card.classList.add("col-md-4", "mb-4"); // Colocar la tarjeta en una columna de 4 y agregar un margen inferior

            card.innerHTML = `
                <div class="card" onclick="viewMovieDetails(${movie.id})">
                    <img src="${movie.poster}" class="card-img-top" alt="${movie.name}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.name}</h5>
                    </div>
                </div>
            `;
            movieGrid.appendChild(card);
        });
    }
}

function viewMovieDetails(movieId) {
    window.location.replace(`detailMovie.html?id=${movieId}`);
}
