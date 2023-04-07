// Get all form fields and btn
const name = document.getElementById("name");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmation = document.getElementById("confirmation");
const submitBtn = document.getElementById("submit-btn")
var charCount = 0;

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
    const usernameValue = username.value;
    if (usernameValue.length < 7) {
        alert("Username should be atleast 7 characters long")
    }
    const emailValue = email.value;
    if (!emailValue.includes("@")) {
        alert("Invalid email")
    }
    const passwordValue = password.value;
    const confirmationValue = confirmation.value;
    if (passwordValue.length < 8) {
        alert("Password should be atleast 8 characters long")
    }
    if (passwordValue[0] < "A" || passwordValue[0] > "Z") {
        alert("First letter of password must be capital")
    }
    for (char of passwordValue) {
        if (char) {
            charCount++;
        }
    }

    if (passwordValue !== confirmationValue) {
        alert("Passwords do not match")
    }
})
