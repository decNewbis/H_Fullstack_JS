// task 2

function getEvenNumArray(numArray) {
    return numArray.filter((element) => (element % 2) === 0);
}

function startApp() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const evenNumArray = getEvenNumArray(numbers);
    console.log(evenNumArray);
}
startApp();