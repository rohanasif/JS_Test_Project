// Function to handle data caching for daily trending movies
function showStartPage() {
    const date = new Date();
    const dateString = date.getDate();
    const monthString = date.getMonth();
    const yearString = date.getFullYear();
    const storageKey = `${monthString}-${dateString}-${yearString}`;

    // Check if data is in cache.
    if (localStorage.getItem(storageKey) && localStorage.getItem(storageKey) !== "undefined") {
        const movies = JSON.parse(localStorage.getItem(storageKey));
        showMovies(movies);
    }

    // Else fetch data and cache it.
    else {
        fetch(
            `${START_URL}api_key=${API_KEY}`
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

showStartPage();