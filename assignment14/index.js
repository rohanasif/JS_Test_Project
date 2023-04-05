arr = ["1324", "223423", "323423423", "42322"]

newArr = arr.forEach(element => {
    console.log(element.length)
});

const array = arr.map(element => element.length)
console.log(array)