const API_KEY = "92dc21f6d154878a0bdc203f0e869f85";
const SEARCH_URL = "https://api.themoviedb.org/3/search/";
const CAST_URL = "https://api.themoviedb.org/3/movie/"
const search = document.getElementById("search");
const section = document.querySelector("section");
const detail = document.createElement("div");
detail.className = "detail";

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
                section.innerHTML = ""; // Clear out previous search results
                movies.forEach(movie => {
                    const card = document.createElement("div");
                    card.className = "card";
                    const img = document.createElement("img");
                    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                    const title = document.createElement("p");
                    title.innerText = movie.original_title;
                    card.appendChild(img);
                    card.appendChild(title);
                    section.appendChild(card);

                    // Add click event to each card
                    card.addEventListener("click", () => {
                        detail.innerHTML = ""; // Clear out previous detail contents
                        const closeBtn = document.createElement("button");
                        closeBtn.innerText = "Close";
                        const title = document.createElement("h2");
                        title.innerText = movie.original_title;
                        const releaseDate = document.createElement("p");
                        releaseDate.innerText = `Release date: ${movie.release_date}`;
                        const overview = document.createElement("p");
                        overview.innerText = movie.overview;
                        const poster = document.createElement("img");
                        poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                        const castTitle = document.createElement("h3");
                        castTitle.innerText = "Cast:";
                        detail.appendChild(closeBtn);
                        detail.appendChild(title);
                        detail.appendChild(releaseDate);
                        detail.appendChild(overview);
                        detail.appendChild(poster);
                        detail.appendChild(castTitle);
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
