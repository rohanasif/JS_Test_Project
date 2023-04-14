// Loop through the radio button to check if keyword is checked
for (const radioBtn of radioBtns) {
    radioBtn.addEventListener('change', () => {
        if (radioBtn.checked && radioBtn.value === "keyword") {

            // Add keypress listener to search bar
            search.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    const query = e.target.value;
                    const formatted_query = query.trim().split(" ").join("%20");
                }
            });
        }
    });
}