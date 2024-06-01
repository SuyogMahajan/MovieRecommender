let suggestions = [
    "Channel",
    "CodingLab",
    "CodingNepal",
    "YouTube",
    "YouTuber",
    "YouTube Channel",
    "Blogger",
    "Bollywood",
    "Vlogger",
    "Vechiles",
    "Facebook",
    "Freelancer",
    "Facebook Page",
    "Designer",
    "Developer",
    "Web Designer",
    "Web Developer",
    "Login Form in HTML & CSS",
    "How to learn HTML & CSS",
    "How to learn JavaScript",
    "How to became Freelancer",
    "How to became Web Designer",
    "How to start Gaming Channel",
    "How to start YouTube Channel",
    "What does HTML stands for?",
    "What does CSS stands for?",
];

// getting all required elements
const searchInput = document.querySelector(".searchInput");
const input = searchInput.querySelector("input");
const resultBox = searchInput.querySelector(".resultBox");
const icon = searchInput.querySelector(".icon");
let linkTag = searchInput.querySelector("a");
let webLink;

// if user press any key and release
input.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
        });
        console.log(emptyArray)
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = '<li>'+ data +'</li>';
        });
        searchInput.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = resultBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchInput.classList.remove("active"); //hide autocomplete box
    }
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>'+ userValue +'</li>';
    }else{
        listData = list.join('');
    }
    resultBox.innerHTML = listData;
}


const moviesData = [
    { title: "Inception", image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg" },
    { title: "The Dark Knight", image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
    { title: "Interstellar", image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
    { title: "Pulp Fiction", image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg" }
];

// // Function to display movie cards
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
displayMovies(moviesData);
// // Event listener for input and select change
document.getElementById("userInput").addEventListener("input", function() {
    const userInput = this.value.trim();
    // const filteredMovies = moviesData.filter(movie => movie.title.toLowerCase().includes(userInput.toLowerCase()));
    displayMovies(moviesData);
});

document.getElementById("recommendation").addEventListener("change", function() {
    const selectedMovie = this.value;
    const movie = moviesData.find(movie => movie.title === selectedMovie);
    if (movie) {
        displayMovies([movie]);
    }
});

// // Display all movies initially
displayMovies(moviesData);
