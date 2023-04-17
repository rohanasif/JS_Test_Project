cars = [
    {
        name: "toyota",
        model: "corolla",
        reg: 2012
    },
    {
        name: "honda",
        model: "civic",
        reg: 2020
    },
    {
        name: "suzuki",
        model: "mehran",
        reg: 2008
    }
]

cars.forEach(element => {
    if (element.reg <= 2012) {
        console.log(`${element.name}'s registration is in ${element.reg}. It is expired`)
    }
});