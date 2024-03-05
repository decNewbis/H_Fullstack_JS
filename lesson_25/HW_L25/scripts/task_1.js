// task 1

function countVowels(value) {
    const vowelListLatinCyrillic = [
        'a', 'e', 'i', 'o', 'u', 'y',  // latin
        'а', 'я', 'у', 'ю', 'о', 'е', 'є', 'и', 'і', 'ї', 'ё', 'э', 'ы'  // cyrillic
    ];
    let listOfVowelsInValue = [];
    for (let char of (value.toLowerCase())) {
        if (vowelListLatinCyrillic.includes(char)) {
            listOfVowelsInValue.push(char);
        }
    }
    console.log(`В вашем тексте содержится гласных в количестве: ${listOfVowelsInValue.length} шт.`);
}

function startApp() {
    const inputString = prompt(
        'Введите предложение для подсчета количества гласных. Результат будет выведен в консоль',
        'Hello World! Hello my dear WATSON!'
    );
    if (inputString) {
        countVowels(inputString);
    }
}

startApp();
