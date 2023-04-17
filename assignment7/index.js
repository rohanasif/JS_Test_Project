let arr = [1230, 23, 122, 0, 12];
max = arr[0];
second_max = -Infinity;

for (i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i];
    }
}
for (j = 0; j < arr.length; j++) {
    if (arr[j] > second_max && arr[j] < max) {
        second_max = arr[j];
    }
}
console.log(max, second_max);
