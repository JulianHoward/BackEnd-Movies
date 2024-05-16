document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    const response = await fetch(`http://127.0.0.1:5000/movies/${movieId}`);
    const movie = await response.json();

    const movieDetails = document.getElementById("movieDetails");
    movieDetails.innerHTML = `
        <h1>${movie.name}</h1>
        <img src="${movie.poster}" alt="${movie.name}">
        <p><strong>Rating:</strong> ${movie.rating}</p>
        <p><strong>Género:</strong> ${movie.genre}</p>
        <p><strong>Fecha de Estreno:</strong> ${movie.releaseDate}</p>
        <p><strong>Sinópsis:</strong> ${movie.synopsis}</p>
        <button onclick="editMovie(${movie.id})">Editar</button>
        <button onclick="deleteMovie(${movie.id})">Eliminar</button>
    `;
});

// Función para editar la película
window.editMovie = (movieId) => {
    window.location.href = `createMovies.html?id=${movieId}`;
};

// Función para eliminar la película
async function deleteMovie(id){
    const response = await fetch(`http://127.0.0.1:5000/delete/movie/${id}`, {
        method: 'DELETE'
    });
    if (response.ok){
        window.location.href = 'listMovies.html'; // Redirigir a la lista de películas después de eliminar
    }
}