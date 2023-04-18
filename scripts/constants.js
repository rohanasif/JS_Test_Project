// Global constants
const API_KEY = "92dc21f6d154878a0bdc203f0e869f85";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?";
const CAST_URL = "https://api.themoviedb.org/3/movie/";
const KEYWORD_URL = "https://api.themoviedb.org/3/search/keyword?";
const START_URL = "https://api.themoviedb.org/3/trending/movie/day?";

// Get DOM elements
const search = document.getElementById("search");
const searchIcon = document.getElementById(".icon-div");
const radioBtns = document.querySelectorAll('input[name="criteria"]');
const titleRadioBtn = document.getElementById('title');
const keywordRadioBtn = document.getElementById('keyword');
const submitBtn = document.getElementById("submit");
const section = document.querySelector("section");

// Create the detail and overlay elements
const detail = document.createElement("div");
detail.className = "detail";
const detailText = document.createElement("div");
detailText.className = "detail-text";
const btnDiv = document.createElement("div");
btnDiv.className = "btn-div";
const overlay = document.createElement("div");
overlay.className = "overlay";

// Title query function
const handleTitleSubmit = (e) => {
    e.preventDefault();
    section.innerHTML = "";
    const query = search.value;
    const formattedQuery = query.trim().split(" ").join("%20");

    // Check if query is empty
    if (query === "") {
        return;
    }

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

    // Check if query is empty
    if (query === "") {
        return;
    }

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

// Function to show cast members in detail div.
function showCast(cast) {
    const castList = document.createElement("ul");
    castList.className = "cast-ul";
    cast.forEach((actor) => {
        const listItem = document.createElement("li");
        listItem.className = "cast-li";
        listItem.innerText = actor.name;
        castList.appendChild(listItem);
    });
    detailText.appendChild(castList);
}

// Function to prevent form submission if no radio button is checked
const preventSubmission = (e) => {
    if (!titleRadioBtn.checked && !keywordRadioBtn.checked) {
        alert("Please select a criteria to search by");
        e.preventDefault();
    }
    if (search.value === "") {
        e.preventDefault();
        return;
    }
}

// Function to render movie cards
function showMovies(movies) {

    // Clear the section element to remove any previously displayed movies.
    section.innerHTML = "";

    // Loop through the array of movie objects.
    movies.forEach((movie) => {

        // Create a new div element with the class "card" to display each movie.
        const card = document.createElement("div");
        card.className = "card";

        // Create an image element and set its source to the movie's poster path if available, or a placeholder image if not.
        const img = document.createElement("img");
        img.src = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://placehold.co/210x350";

        // Create a paragraph element to display the movie's original title.
        const title = document.createElement("p");
        title.className = "title";
        title.innerText = movie.original_title;

        // Create a paragraph element to display the movie's release date if available, or a default message if not.
        const releaseDate = document.createElement("p");
        releaseDate.className = "date";
        releaseDate.innerText = movie.release_date
            ? `Release date: ${movie.release_date}`
            : "Release date: Not found";

        // Create a paragraph element to display the movie's rating.
        const rating = document.createElement("p");
        rating.className = "rating";

        // Round the rating to 1 decimal place.
        rating.innerText = `Rating: ${Math.round(parseFloat(movie.vote_average) * 10) / 10}/10`;

        // Append the image, title, and release date elements to the card element.
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(releaseDate);
        card.appendChild(rating);

        // Append the card element to the section element.
        section.appendChild(card);

        // Add a click event listener to the card element.
        card.addEventListener("click", () => {

            // Clear the detail element to remove any previously displayed movie details.
            detail.innerHTML = "";
            btnDiv.innerHTML = "";
            detailText.innerHTML = "";

            // Create a button element to close the movie details.
            const closeBtn = document.createElement("button");
            closeBtn.innerText = "X";
            btnDiv.appendChild(closeBtn);

            // Create a heading element to display the movie's original title.
            const title = document.createElement("h2");
            title.innerText = movie.original_title;

            // Create a paragraph element to display the movie's overview.
            const overview = document.createElement("p");
            overview.innerText = movie.overview;

            // Create a heading element to display the cast title.
            const castTitle = document.createElement("h3");
            castTitle.innerText = "Cast:";

            // Append the details to the detailText div
            detailText.appendChild(title);
            detailText.appendChild(overview);
            detailText.appendChild(castTitle);

            // Append the detailText and btnDiv to the detail element.
            detail.appendChild(btnDiv);
            detail.appendChild(detailText);


            // Append the detail element to the overlay element.
            overlay.appendChild(detail);

            // Append the overlay element to the section element.
            section.appendChild(overlay);

            // Check if the cast data for the movie is in the cache.
            if (localStorage.getItem(`${movie.id}`)) {

                // If the data is in the cache, retrieve it and display the cast.
                const cast = JSON.parse(localStorage.getItem(`${movie.id}`));
                showCast(cast);
            }
            else {

                // If the data is not in the cache, fetch it from the API and cache it.
                fetch(`${CAST_URL}${movie.id}/credits?api_key=${API_KEY}`)
                    .then((res) => res.json())
                    .then((data) => {
                        const cast = data.cast;
                        localStorage.setItem(`${movie.id}`, JSON.stringify(cast));
                        showCast(cast);
                    })
                    .catch((err) => console.error(err));
            }

            // Add a click event listener to the close button element to remove the detail element.
            closeBtn.addEventListener("click", () => {
                section.removeChild(overlay);
            });
        });

        // Add event listener to the "card" element when clicked.
        card.addEventListener("click", () => {

            // Select all elements with class "detail".
            const allDetails = document.querySelectorAll(".detail");

            // Loop through each detail element and set its display to "none".
            allDetails.forEach(detail => {
                detail.style.display = "none";
            });

            // Set the clicked element's detail display to "flex".
            detail.style.display = "flex";
        });
    });
}