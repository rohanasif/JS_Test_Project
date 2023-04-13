const API_KEY = "92dc21f6d154878a0bdc203f0e869f85";
const BASE_URL = "https://api.themoviedb.org/3/search/";
const search = document.getElementById("search");
const cards = document.querySelectorAll(".card");
const detail = document.querySelector(".detail");
const section = document.querySelector("section");

search.addEventListener("keypress", (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
        const query = e.target.value;
        const formatted_query = query.split(" ").join("%20");

        // fetch("https://api.themoviedb.org/3/search/movie?api_key=92dc21f6d154878a0bdc203f0e869f85&query=The%20last%20of%20us&page=1")
        //     .then(res => res.json())
        //     .then(data => console.log(data));

        // Fetch by movie name
        const movieData = fetch(`${BASE_URL}movie?api_key=${API_KEY}&query=${formatted_query}`)
            .then(res => res.json())
            .then(data => localStorage.setItem("data", JSON.stringify(data)))
            .then(() => {
                const data = localStorage.getItem("data");
                const parsedData = JSON.parse(data);
                const item = parsedData.results[0];
                return item;
            })
            .then(item => {
                document.querySelectorAll("p")[0].innerText = item.original_title;
                document.querySelectorAll("span")[0].innerText = item.release_date;
                document.querySelectorAll("img")[0].src = item.poster_path;
            })
            .catch(err => console.error(err));

        // Fetch by keyword
        // const keywordData = fetch(`${BASE_URL}keyword?api_key=${API_KEY}&query=${formatted_query}`)
        //     .then(res => res.json())
        //     .then(data => localStorage.setItem("data", JSON.stringify(data)))
        //     .catch(err => console.error(err))
    }
})

cards.forEach(card => {
    card.addEventListener("click", (e) => {
        e.preventDefault();
        
    })
})
const closebtns = document.querySelectorAll("button");
closebtns.forEach((closebtn) => {
    closebtn.addEventListener("click", (e) => {
        e.preventDefault();

    })
})