// task 3

function findLongestAndShortestWord(valueString = '') {
    const valueWordArray = valueString.split(' ');
    let longest = '';
    let shortest = valueWordArray[0];
    valueWordArray.forEach((element) => {
        (element.length > longest.length) ? (longest = element) : ''; // '' - заглушка, аналог 'pass'
        (element.length < shortest.length) ? (shortest = element) : '';
    })
    console.log('longest:', longest);
    console.log('shortest:', shortest);
}

findLongestAndShortestWord("The quick brown fox jumped over the lazy dog");