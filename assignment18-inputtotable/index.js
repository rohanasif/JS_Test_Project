// Get tablebody and input elements
const tbody = document.getElementById("tbody");
const make = document.getElementById("make");
const model = document.getElementById("model");
const reg = document.getElementById("reg");
const color = document.getElementById("color");

// Create serial no.
var serialNo = 0;

// Get all paragraph elements
const makecheck = document.getElementById("makecheck");
const modelcheck = document.getElementById("modelcheck");
const regcheck = document.getElementById("regcheck");
const colorcheck = document.getElementById("colorcheck");

// Get submit button element
const submitbtn = document.getElementById("submit-btn");

// Create validation booleans
var isValidMake;
var isValidModel;
var isValidReg;

// Add validation to make
const validateMake = () => {
    const makeValue = make.value;
    if (makeValue.length < 8) {
        makecheck.innerText = "Car make should be atleast 8 characters long";
        isValidMake = false;
    }
    else {
        makecheck.innerText = "";
        isValidMake = true;
    }
}

// Add eventListeners to make
make.addEventListener("focusout", validateMake);
make.addEventListener("input", validateMake);

// Add validation to model
const validateModel = () => {
    const modelValue = model.value;
    if (modelValue.length < 8) {
        modelcheck.innerText = "Car model should be atleast 8 characters long";
        isValidModel = false;
    }
    else {
        modelcheck.innerText = "";
        isValidModel = true;
    }
}

// Add eventListeners to model
model.addEventListener("focusout", validateModel);
model.addEventListener("input", validateModel);

// Add validation to registration no.
const validateReg = () => {
    const regValue = reg.value;
    if (regValue.includes("0") || regValue.includes("1") || regValue.includes("2") || regValue.includes("3") || regValue.includes("4") || regValue.includes("5") || regValue.includes("6") || regValue.includes("7") || regValue.includes("8") || regValue.includes("9")) {
        regcheck.innerText = "";
        isValidReg = true;
    }
    else {
        regcheck.innerText = "Car registration should contain numbers";
        isValidReg = false;
    }
}

// Add eventListener to registration no.
reg.addEventListener("focusout", validateReg);
reg.addEventListener("input", validateReg);

// Handle submit
submitbtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Get all values from the form
    const makeValue = make.value;
    const modelValue = model.value;
    const regValue = reg.value;
    const colorValue = color.value;

    if (makeValue !== "" && modelValue !== "" && regValue !== "" && colorValue !== "") {
        if (isValidMake && isValidModel && isValidReg) {

            // Increase serial no. by one and add to dom
            serialNo++;
            const serialtd = document.createElement("td");
            const serialnode = document.createTextNode(serialNo);



            // Create a table row
            const tr = document.createElement("tr");

            // Create cells to hold form data
            const maketd = document.createElement("td");
            const modeltd = document.createElement("td");
            const regtd = document.createElement("td");
            const colortd = document.createElement("td");

            // Create textnodes to hold form values
            const makenode = document.createTextNode(makeValue);
            const modelnode = document.createTextNode(modelValue);
            const regnode = document.createTextNode(regValue);
            const colornode = document.createTextNode(colorValue);

            // Append all nodes to tds and all tds to tr
            serialtd.appendChild(serialnode);
            tr.appendChild(serialtd);
            maketd.appendChild(makenode);
            tr.appendChild(maketd);
            modeltd.appendChild(modelnode);
            tr.appendChild(modeltd);
            regtd.appendChild(regnode);
            tr.appendChild(regtd);
            colortd.appendChild(colornode);
            tr.appendChild(colortd);

            // Append the tr to tbody
            tbody.appendChild(tr);
        }
        else {
            alert("Check all values first!")
        }
    }
    else {
        alert("Some of the values are missing")
    }
})