const API_KEY = "92dc21f6d154878a0bdc203f0e869f85";
const SEARCH_URL = "https://api.themoviedb.org/3/search/";
const CAST_URL = "https://api.themoviedb.org/3/movie/"
const search = document.getElementById("search");
const cards = document.querySelectorAll(".card");
const detail = document.querySelectorAll(".detail");
const section = document.querySelector("section");

search.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        e.preventDefault();
        const query = e.target.value;
        const formatted_query = query.split(" ").join("%20");

        // Fetch Movie data by searching name
        const movieData = fetch(`${SEARCH_URL}movie?api_key=${API_KEY}&query=${formatted_query}`)
            .then(res => res.json())
            .then(data => localStorage.setItem("data", JSON.stringify(data)))
            .then(() => {
                const data = localStorage.getItem("data");
                const parsedData = JSON.parse(data);
                const movie = parsedData.results[0];
                const id = movie.id;
                document.querySelectorAll("p")[0].innerText = movie.original_title;
                document.querySelectorAll("span")[0].innerText = movie.release_date;
                document.querySelectorAll("img")[0].src = movie.poster_path;
                document.querySelectorAll("h3")[0].innerText = movie.overview;
                return id;
            })
            .then(identity => {
                fetch(`${CAST_URL}${identity}/credits?api_key=${API_KEY}`)
            })
            .then(res => res.json())
            .then(data => localStorage.setItem("credits", JSON.stringify(data)))
            .then(() => {
                const data = localStorage.getItem("credits");
                const parsedData = JSON.parse(data);
                const credits = parsedData.cast[0];
                document.querySelectorAll("h4")[0].innerText = credits.name;
            })
            .then(() => {
                const cards = document.querySelectorAll(".card");
                cards.forEach((card, index) => {
                    card.addEventListener("click", (e) => {
                        detail[index].style.display = "flex";
                    });
                });

            })
            .catch(err => console.error(err));
        return false;
    }
})

const closebtns = document.querySelectorAll("button");
closebtns.forEach((closebtn) => {
    closebtn.addEventListener("click", (e) => {
        detail.forEach((el) => {
            el.style.display = "none";
        })

    })
});