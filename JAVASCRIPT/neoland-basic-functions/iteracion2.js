const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];

function findLongestWord(param) {
    let maxLongitud=0;
    for (let i=1; i < avengers.length; i++){

        if (avengers[i].length > avengers[maxLongitud].length)
            maxLongitud= i;
    }
    return avengers[maxLongitud];
}
console.log(findLongestWord(avengers));