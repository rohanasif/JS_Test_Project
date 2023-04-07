const tbody = document.getElementById("tbody");
const make = document.getElementById("make");
const model = document.getElementById("model");
const reg = document.getElementById("reg");
const color = document.getElementById("color");
const submitbtn = document.getElementById("submit-btn");

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