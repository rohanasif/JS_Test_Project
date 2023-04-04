function getEven(arr) {
    const length = arr.length;
    for (var i = 0; i < length; i++) {
        if (arr[i] % 2 === 0) {
            console.log(arr[i]);
        }
    }
}
getEven([1, 2, 3, 4, 5])