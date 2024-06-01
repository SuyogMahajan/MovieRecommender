const moviesData = [
    { title: "Inception", image: "https://via.placeholder.com/150" },
    { title: "The Dark Knight", image: "https://via.placeholder.com/150" },
    { title: "Interstellar", image: "https://via.placeholder.com/150" },
    { title: "Pulp Fiction", image: "https://via.placeholder.com/150" }
];

// Function to display movie cards
function displayMovies(movies) {
    const movieList = document.getElementById("movieList");
    movieList.innerHTML = "";
    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        const image = document.createElement("img");
        image.src = movie.image;
        image.alt = movie.title;
        image.classList.add("movie-image");
        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");
        const title = document.createElement("p");
        title.classList.add("movie-title");
        title.textContent = movie.title;
        movieInfo.appendChild(title);
        movieCard.appendChild(image);
        movieCard.appendChild(movieInfo);
        movieList.appendChild(movieCard);
    });
}

// Event listener for input and select change
document.getElementById("userInput").addEventListener("input", function() {
    const userInput = this.value.trim();
    const filteredMovies = moviesData.filter(movie => movie.title.toLowerCase().includes(userInput.toLowerCase()));
    displayMovies(filteredMovies);
});

document.getElementById("recommendation").addEventListener("change", function() {
    const selectedMovie = this.value;
    const movie = moviesData.find(movie => movie.title === selectedMovie);
    if (movie) {
        displayMovies([movie]);
    }
});

// Display all movies initially
displayMovies(moviesData);
