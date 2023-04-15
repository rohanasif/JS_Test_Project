// Global constants
const API_KEY = "92dc21f6d154878a0bdc203f0e869f85";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?";
const CAST_URL = "https://api.themoviedb.org/3/movie/";
const KEYWORD_URL = "https://api.themoviedb.org/3/search/keyword?";

// Get DOM elements
const search = document.getElementById("search");
const radioBtns = document.querySelectorAll('input[name="criteria"]');
const titleRadioBtn = document.getElementById('title');
const keywordRadioBtn = document.getElementById('keyword');
const submitBtn = document.getElementById("submit");
const section = document.querySelector("section");

// Create the detail and overlay elements
const detail = document.createElement("div");
detail.className = "detail";
const overlay = document.createElement("div");
overlay.className = "overlay";

// Title query function
const handleTitleSubmit = (e) => {
    e.preventDefault();
    section.innerHTML = "";
    const query = search.value;
    const formattedQuery = query.trim().split(" ").join("%20");
    const storageKey = formattedQuery + "-byTitle";

    // Check if data is in cache.
    if (localStorage.getItem(storageKey) && localStorage.getItem(storageKey) !== "undefined") {
        const movies = JSON.parse(localStorage.getItem(storageKey));
        showMovies(movies);
    }

    // Else fetch data and cache it.
    else {
        fetch(
            `${SEARCH_URL}api_key=${API_KEY}&query=${formattedQuery}`
        )
            .then((res) => res.json())
            .then((data) => {
                const movies = data.results;
                localStorage.setItem(storageKey, JSON.stringify(movies));
                showMovies(movies);
            })
            .catch((err) => console.error(err));
    }
}

// Keyword query function
const handleKeywordSubmit = (e) => {
    e.preventDefault();
    section.innerHTML = "";
    const query = search.value;
    const formattedQuery = query.trim().split(" ").join("%20");
    const storageKey = formattedQuery + "-byKeyword";

    // Check if data is in cache.
    if (localStorage.getItem(storageKey) && localStorage.getItem(storageKey) !== "undefined") {
        const items = JSON.parse(localStorage.getItem(storageKey));
        showItems(items);
    }

    // Else fetch data and cache it.
    else {
        fetch(
            `${KEYWORD_URL}api_key=${API_KEY}&query=${formattedQuery}`
        )
            .then((res) => res.json())
            .then((data) => {
                const items = data.results;
                localStorage.setItem(storageKey, JSON.stringify(items));
                showItems(items);
            })
            .catch((err) => console.error(err));
    }
}

// Function to prevent form submission if no radio button is checked
const preventSubmission = (e) => {
    if (!titleRadioBtn.checked && !keywordRadioBtn.checked) {
        e.preventDefault();
    }
}