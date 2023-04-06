function countVowels(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    var count = 0;
    for (let letter of str.toLowerCase()) {
        if (vowels.includes(letter)) {
            count++;
        }
    }
    return count;
}

console.log(countVowels("adsfsdakiou"));