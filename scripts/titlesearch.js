// Prevent form submission if no radio button is checked
submitBtn.addEventListener("click", preventSubmission);

// Loop through the radio button to check if title button is checked.
for (const radioBtn of radioBtns) {
    radioBtn.addEventListener('change', () => {
        if (radioBtn.checked && radioBtn.value === "title") {

            // Change focus to searchbar as soon as a radio button is clicked
            search.focus();

            // Add click listener to submit button.
            submitBtn.addEventListener("click", handleTitleSubmit);
        }
    });
}