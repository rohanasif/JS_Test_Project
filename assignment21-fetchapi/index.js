async function getText() {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}
getText();