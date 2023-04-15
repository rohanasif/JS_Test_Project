// Global constants
const API_KEY = "92dc21f6d154878a0bdc203f0e869f85";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?";
const CAST_URL = "https://api.themoviedb.org/3/movie/";
const KEYWORD_URL = "https://api.themoviedb.org/3/search/keyword?";

// Get dom elements
const search = document.getElementById("search");

const radioBtns = document.querySelectorAll('input[name="criteria"]')

const submitBtn = document.getElementById("submit");

const section = document.querySelector("section");

// Create the detail and overlay elements
const detail = document.createElement("div");
detail.className = "detail";
const overlay = document.createElement("div");
overlay.className = "overlay";