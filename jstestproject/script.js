// API key and URLs
const API_KEY = "92dc21f6d154878a0bdc203f0e869f85";
const SEARCH_URL = "https://api.themoviedb.org/3/search/";
const CAST_URL = "https://api.themoviedb.org/3/movie/"

// DOM elements
const search = document.getElementById("search");
const section = document.querySelector("section");
const detail = document.createElement("div");
detail.className = "detail";

// Event listener for search bar
search.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const query = e.target.value;
        const formatted_query = query.split(" ").join("%20");

        // Fetch Movie data by searching name
        const movieData = fetch(`${SEARCH_URL}movie?api_key=${API_KEY}&query=${formatted_query}`)
            .then(res => res.json())
            .then(data => {
                const movies = data.results;

                // Clear out previous search results
                section.innerHTML = "";

                // Loop through movies and create cards for each
                movies.forEach(movie => {
                    const card = document.createElement("div");
                    card.className = "card";

                    // Create image element for poster
                    const img = document.createElement("img");

                    // Ternary operator to set image source
                    img.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://placehold.co/210x350";

                    // Create element for movie title
                    const title = document.createElement("p");
                    title.innerText = movie.original_title;

                    // Create element for release date
                    const releaseDate = document.createElement("p");
                    releaseDate.style.fontSize = "10px";

                    // Ternary operator to set release date text
                    releaseDate.innerText = movie.release_date ? `Release date: ${movie.release_date}` : "Release date: Not found";

                    // Add elements to card
                    card.appendChild(img);
                    card.appendChild(title);
                    card.appendChild(releaseDate);

                    // Add card to section
                    section.appendChild(card);

                    // Add click event to each card
                    card.addEventListener("click", () => {
                        detail.innerHTML = ""; // Clear out previous detail contents

                        // Create close button element
                        const closeBtn = document.createElement("button");
                        closeBtn.innerText = "Close";

                        // Create title element for movie
                        const title = document.createElement("h2");
                        title.innerText = movie.original_title;

                        // Create overview element for movie
                        const overview = document.createElement("p");
                        overview.innerText = movie.overview;

                        // Create title element for cast
                        const castTitle = document.createElement("h3");
                        castTitle.innerText = "Cast:";

                        // Add elements to detail section
                        detail.appendChild(closeBtn);
                        detail.appendChild(title);
                        detail.appendChild(overview);
                        detail.appendChild(castTitle);

                        // Add detail section to section
                        section.appendChild(detail);

                        // Fetch cast data for the movie
                        fetch(`${CAST_URL}${movie.id}/credits?api_key=${API_KEY}`)
                            .then(res => res.json())
                            .then(data => {
                                const cast = data.cast;
                                const castList = document.createElement("ul");
                                castList.className = "cast-list";
                                cast.forEach(member => {
                                    const listItem = document.createElement("li");
                                    listItem.innerText = member.name;
                                    castList.appendChild(listItem);
                                });

                                // Add cast list to detail section
                                detail.appendChild(castList);
                            });

                        // Add click event to the close button
                        closeBtn.addEventListener("click", () => {
                            section.removeChild(detail);
                        });
                    });

                    // Add event listener to hide other details on click
                    card.addEventListener("click", () => {
                        const allDetails = document.querySelectorAll(".detail");
                        allDetails.forEach(detail => {
                            detail.style.display = "none";
                        });
                        detail.style.display = "flex";
                    });
                });
            })
            .catch(err => console.error(err));
        return false;
    }
});
