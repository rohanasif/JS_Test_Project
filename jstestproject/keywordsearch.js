// Loop through the radio button to check if keyword is checked.
for (const radioBtn of radioBtns) {
    radioBtn.addEventListener('change', () => {
        if (radioBtn.checked && radioBtn.value === "keyword") {

            // Add keypress listener to search bar.
            search.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    const query = e.target.value;
                    const formattedQuery = query.trim().split(" ").join("%20");
                    const storageKey = formattedQuery + "-byKeyword";
                    // Check if data is in cache.
                    if (localStorage.getItem(storageKey) && localStorage.getItem(storageKey) !== "undefined") {
                        const items = JSON.parse(localStorage.getItem(storageKey));
                        showItems(items);

                        // Returning false from an event handler will automatically call event.stopPropagation() and event.preventDefault().
                        return false;
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

                        // Returning false from an event handler will automatically call event.stopPropagation() and event.preventDefault().
                        return false;
                    }
                }
            });
        }
    });
}

// Function to show movies in card div.
function showItems(items) {

    // Clear the section element to remove any previously displayed movies.
    section.innerHTML = "";

    // Loop through the array of items.
    items.forEach(item => {

        // Get the value of "name" from each item.
        const newQuery = item.name;
        const formattedNewQuery = newQuery.trim().split(" ").join("%20");
        // Using "-byTitle" since these are essentially movie queries now.
        const storageKey = formattedNewQuery + "-byTitle";

        // Check if data is in cache.
        if (localStorage.getItem(storageKey) && localStorage.getItem(storageKey) !== "undefined") {
            const movies = JSON.parse(localStorage.getItem(storageKey));
            showMovies(movies);

            // Returning false from an event handler will automatically call event.stopPropagation() and event.preventDefault().
            return false;
        }
    });
}