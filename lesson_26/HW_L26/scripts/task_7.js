// task 7

function startApp() {
    const sentences = ["JavaScript цікавий", "Масиви це корисно", "Вивчайте програмування щодня"];
    const sumWords = sentences.reduce((sum, element) => {
        sum += element.split(' ').length;
        return sum
    }, 0);
    console.log('sumWords:', sumWords);
}

startApp();