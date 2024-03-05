// task 1

function countVowels(value) {
    const vowelListLatinCyrillic = [
        'a', 'e', 'i', 'o', 'u', 'y',  // latin
        'а', 'я', 'у', 'ю', 'о', 'е', 'є', 'и', 'і', 'ї', 'ё', 'э', 'ы'  // cyrillic
    ];
    let valueArray = value.toLowerCase().split('');

    // variant 1
    let listOfVowelsInValueV1 = [];
    for (let char of (value.toLowerCase())) {
        if (vowelListLatinCyrillic.includes(char)) {
            listOfVowelsInValueV1.push(char);
        }
    }
    console.log('Variant 1',`В вашем тексте содержится гласных в количестве: ${listOfVowelsInValueV1.length} шт.`);

    // variant 2
    let listOfVowelsInValueV2 = valueArray.filter((element) => {
        if (vowelListLatinCyrillic.includes(element)) {
            return element
        }
    })
    console.log('Variant 2',`В вашем тексте содержится гласных в количестве: ${listOfVowelsInValueV2.length} шт.`);
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
