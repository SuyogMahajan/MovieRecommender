let suggestions = [];
let moviesData = [];

fetch('http://127.0.0.1:8000/api/movies/')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    suggestions = data['data']
    console.log('Data received:', data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

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
 
input.onkeydown = async (e) => {
  let userData = e.target.value.trim();
  let emptyArray2 = [];
  if (userData) {
      emptyArray2 = await fetchRecommendations(userData); // Fetch recommendations
      console.log(emptyArray2);
      searchInput.classList.add("active"); // Show autocomplete box
      displayMovies(emptyArray2); // Display recommended movies
  } else {
      searchInput.classList.remove("active"); // Hide autocomplete box
  }
};

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


function fetch_image(movie) {
  return new Promise((resolve, reject) => {
      fetch('https://api.themoviedb.org/3/movie/' + movie + '?api_key=6a5b0f67805f97c8f6cd45a0874b6eb3&language=en-US')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              const poster_path = data['poster_path'];
              const img = "https://image.tmdb.org/t/p/w500/" + poster_path;
              resolve(img);
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
              reject(error);
          });
  });
}
// Update the fetch function to fetch recommendations based on the entered movie
async function fetchRecommendations(movieName) {
  try {
      const response = await fetch('http://127.0.0.1:8000/api/content_based_recommendation/?name=' + encodeURIComponent(movieName));
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.data;
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return [];
  }
}

// Update displayMovies to handle both moviesData and recommended movies
async function displayMovies(movieData) {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = "";

  for (const movie of movieData) {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");

      const image = document.createElement("img");
      const imgSrc = await fetch_image(movie.movie_id); // Fetch image URL
      image.src = imgSrc;
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
  }
}
// // // Event listener for input and select change
// document.getElementById("userInput").addEventListener("input", function() {
//     const userInput = this.value.trim();
//     // const filteredMovies = moviesData.filter(movie => movie.title.toLowerCase().includes(userInput.toLowerCase()));
//     displayMovies(moviesData);
// });

// document.getElementById("recommendation").addEventListener("change", function() {
//     const selectedMovie = this.value;
//     const movie = moviesData.find(movie => movie.title === selectedMovie);
//     if (movie) {
//         displayMovies([movie]);
//     }
// });

// // Display all movies initially
// displayMovies(moviesData);