// Get all form fields and btn
const name = document.getElementById("name");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmation = document.getElementById("confirmation");
const submitBtn = document.getElementById("submit-btn")
var charCount = 0;
const numsAndSpecials = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "@", "#", "$", "~", "`", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "|", "\\", ";", ":", "'", "\"", ",", "<", ".", ">", "?"]

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const nameValue = name.value.toLowerCase();
    const usernameValue = username.value;
    const passwordValue = password.value;
    const confirmationValue = confirmation.value;

    for (i = 0; i < nameValue.length; i++) {
        // If is not alphabet
        if ((nameValue[i] < "a" || nameValue[i] > "z") && nameValue[i] !== " ") {
            alert("Name should only be letters");
            break;
        }
    }

    if (usernameValue.length < 7) {
        alert("Username should be atleast 7 characters long")
    }
    const emailValue = email.value;
    if (!emailValue.includes("@")) {
        alert("Invalid email")
    }

    if (passwordValue.length < 8) {
        alert("Password should be atleast 8 characters long")
    }
    if (passwordValue[0] < "A" || passwordValue[0] > "Z") {
        alert("First letter of password must be capital")
    }
    for (char of numsAndSpecials) {
        if (passwordValue.includes(char)) {
            charCount++;
        }
    }
    if (charCount < 2) {
        alert("Password must contain atleast one digit and atleast one special character")
    }

    if (passwordValue !== confirmationValue) {
        alert("Passwords do not match")
    }
})
