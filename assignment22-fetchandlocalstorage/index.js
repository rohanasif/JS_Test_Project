fetch(`https://api.agify.io/?name=rohan`)
    .then(response => response.json())
    .then(data => localStorage.setItem("data", JSON.stringify(data)))
    .catch(error => console.error(error));


const fetchedData = localStorage.getItem("data");

document.getElementById("datapara").innerText = fetchedData;

console.log(fetchedData);