// task 6

function startApp() {
    const sentences = ["Я люблю JavaScript", "Масиви це весело", "Програмування це круто"];
    const firstWordsArray = sentences.map((element) => element.split(' ')[0]);
    console.log('firstWordsArray:', firstWordsArray);
}

startApp();