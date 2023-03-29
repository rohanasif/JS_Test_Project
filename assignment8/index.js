a = [[1, 2], [3, 4, 5], [6], [7, 9]];
for (i = 0; i < a.length; i++) {
    var sum = 0;
    for (j = 0; j < a[i].length; j++) {
        sum += a[i][j]
    }
    console.log(sum)
}