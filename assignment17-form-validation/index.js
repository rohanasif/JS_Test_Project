// Get all form fields and btn
const name = document.getElementById("name");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmation = document.getElementById("confirmation");
const submitBtn = document.getElementById("submit-btn")

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const nameValue = name.value.toLowerCase();
    for (i = 0; i < nameValue.length; i++) {
        // If is not alphabet
        if ((nameValue[i] < "a" || nameValue[i] > "z") && nameValue[i] !== " ") {
            alert("Name should only be letters");
            break;
        }
    }
})
