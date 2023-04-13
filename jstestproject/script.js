const API_KEY = "92dc21f6d154878a0bdc203f0e869f85";
const BASE_URL = "https://api.themoviedb.org/3/search/";
const search = document.getElementById("search");
search.addEventListener("input", (e) => {
    e.preventDefault();
    const query = e.target.value;
    const formatted_query = query.split(" ").join("%20");

    // Fetch by movie name
    const movieData = fetch(`${BASE_URL}movie?api_key=${API_KEY}&query=${formatted_query}`)
        .then(res => res.json())
        .then(data => localStorage.setItem("data", JSON.stringify(data)))
        .catch(err => console.error(err));

    // Fetch by keyword
    const keywordData = fetch(`${BASE_URL}keyword?api_key=${API_KEY}&query=${formatted_query}`)
        .then(res => res.json())
        .then(data => localStorage.setItem("data", JSON.stringify(data)))
        .catch(err => console.error(err))

})