// Task 1. The game "Guess a number"

alert('Hello my dear friend!\nI want to play the game "Guess a number" with you =) ' +
    '\nThink of a number from 1 to 10 and I will try to guess it.');

let isAgree = confirm('Are you ready to start the game?');
// attempt counter
let attemptInput = 0;

// checking: ready or not
if (isAgree) {
    // create variables if player ready to start the game
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    let guessedNum = NaN;
    // try to enter the correct value 3 times in a row
    while (isNaN(+guessedNum) && guessedNum != null && attemptInput++ <= 2) {
        guessedNum = prompt('Think of the number from 1 to 10, please. ' +
            'Write it in the gap and press "OK"', '5');
    }
    // comparison of values and output of the result
    if (!isNaN(+guessedNum) && guessedNum != null) {
        if (+guessedNum === randomNumber) {
            alert(`Congratulations, you guessed the number! =) \nThis number was ${randomNumber}`);
        } else {
            alert(`Unfortunately you lost! =( \nMaybe you'll be lucky next time ;) \nThis number was ${randomNumber}`);
        }
        alert('Thanks for playing! See you again!');
    } else if (guessedNum === null) {
        alert('The entered value cannot be null.');
    } else {
        alert('Game over. \nYou entered an incorrect value three times in a row. See you again!');
    }
} else {
    alert('Maybe another time. See you again!');
}