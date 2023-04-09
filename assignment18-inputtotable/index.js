const tbody = document.getElementById("tbody");
const make = document.getElementById("make");
const model = document.getElementById("model");
const reg = document.getElementById("reg");
const color = document.getElementById("color");

const makecheck = document.getElementById("makecheck");
const modelcheck = document.getElementById("modelcheck");
const regcheck = document.getElementById("regcheck");
const colorcheck = document.getElementById("colorcheck");

const submitbtn = document.getElementById("submit-btn");

make.addEventListener("input", (e) => {
    const makeValue = make.value;
    if (makeValue.length < 8) {
        makecheck.innerText = "Car make should be atleast 8 characters long";
    }
    else {
        makecheck.innerText = "";
    }
})

model.addEventListener("input", (e) => {
    const modelValue = model.value;
    if (modelValue.length < 8) {
        modelcheck.innerText = "Car model should be atleast 8 characters long";
    }
    else {
        modelcheck.innerText = "";
    }
})

reg.addEventListener("input", (e) => {
    const regValue = reg.value;
    if (regValue.includes("0") || regValue.includes("1") || regValue.includes("2") || regValue.includes("3") || regValue.includes("4") || regValue.includes("5") || regValue.includes("6") || regValue.includes("7") || regValue.includes("8") || regValue.includes("9")) {
        regcheck.innerText = "";
    }
    else {
        regcheck.innerText = "Car registration should contain numbers";
    }
})

submitbtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Get all values from the form
    const makeValue = make.value;
    const modelValue = model.value;
    const regValue = reg.value;
    const colorValue = color.value;
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
})