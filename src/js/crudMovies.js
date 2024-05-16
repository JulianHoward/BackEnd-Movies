
document.addEventListener("DOMContentLoaded", async () => {
    // Obtener el ID de la película de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    // Si hay un ID de película en la URL, cargar los detalles de la película
    if (movieId) {
        const response = await fetch(`http://127.0.0.1:5000/movies/${movieId}`);
        const movie = await response.json();

        // Completar los campos del formulario con los detalles de la película
        document.getElementById('name').value = movie.name;
        document.getElementById('poster').value = movie.poster;
        document.getElementById('rating').value = movie.rating;
        document.getElementById('genre').value = movie.genre;
        document.getElementById('releaseDate').value = movie.releaseDate;
        document.getElementById('synopsis').value = movie.synopsis;
    }
});

document.getElementById('createForm').addEventListener('submit', createOrUpdateMovie);

async function createOrUpdateMovie(event){
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    const form = event.target;
    const formData = {
        name: form.querySelector('#name').value,
        poster: form.querySelector('#poster').value,
        rating: form.querySelector('#rating').value,
        genre: form.querySelector('#genre').value,
        releaseDate: form.querySelector('#releaseDate').value,
        synopsis: form.querySelector('#synopsis').value
    };

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    let response;
    if (movieId) {
        // Si hay un ID de película en la URL, realizar una actualización
        response = await fetch(`http://127.0.0.1:5000/update/movie/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
    } else {
        // Si no hay un ID de película, crear una nueva película
        response = await fetch('http://127.0.0.1:5000/create/movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
    }

    if (response.ok){
        form.reset();
        window.location.href = 'listMovies.html'; // Redirigir a listMovies.html después de completar la operación
    }
}


async function deleteMovie(id){
    const response = await fetch(`http://127.0.0.1:5000/delete/movie/${id}`, {
        method: 'DELETE'
    });
    if (response.ok){
        loadMovies();
    }
}
