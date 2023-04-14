// Loop through the radio button to check if title button is checked.
for (const radioBtn of radioBtns) {
    radioBtn.addEventListener('change', () => {
        if (radioBtn.checked && radioBtn.value === "title") {

            // Add keypress listener to search bar.
            search.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    const query = e.target.value;
                    const formattedQuery = query.trim().split(" ").join("%20");
                    const storageKey = formattedQuery + "-byTitle";

                    // Check if data is in cache.
                    if (localStorage.getItem(storageKey) && localStorage.getItem(storageKey) !== "undefined") {
                        const movies = JSON.parse(localStorage.getItem(storageKey));
                        showMovies(movies);

                        // Returning false from an event handler will automatically call event.stopPropagation() and event.preventDefault().
                        return false;
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

                        // Returning false from an event handler will automatically call event.stopPropagation() and event.preventDefault().
                        return false;
                    }
                }
            });
        }
    });
}

// Function to show movies in card div using titlesearch.
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

            // Create a button element to close the movie details.
            const closeBtn = document.createElement("button");
            closeBtn.innerText = "X";

            // Create a heading element to display the movie's original title.
            const title = document.createElement("h2");
            title.innerText = movie.original_title;

            // Create a paragraph element to display the movie's overview.
            const overview = document.createElement("p");
            overview.innerText = movie.overview;

            // Create a heading element to display the cast title.
            const castTitle = document.createElement("h3");
            castTitle.innerText = "Cast:";

            // Append the close button, title, overview, and cast title elements to the detail element.
            detail.appendChild(closeBtn);
            detail.appendChild(title);
            detail.appendChild(overview);
            detail.appendChild(castTitle);

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

// Function to show cast members in detail div.
function showCast(cast) {
    const castList = document.createElement("ul");
    castList.className = "cast-li";
    cast.forEach((actor) => {
        const listItem = document.createElement("li");
        listItem.className = "cast-ul";
        listItem.innerText = actor.name;
        castList.appendChild(listItem);
    });
    detail.appendChild(castList);
}