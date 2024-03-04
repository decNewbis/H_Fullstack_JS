// task 1

function roundValueToSecondNum(value) {
 return Math.round(value * 100) / 100;
}

function createCurrencyConverter(rate = 1) {
    let currentRate = rate;

    function getCurrentRate() {
        console.log(currentRate);
        return currentRate;
    }

    function toLocalCurrency(value = 0) {
        value *= currentRate;
        value = roundValueToSecondNum(value).toLocaleString('en-EN', {style: 'currency', currency: 'EUR'});
        console.log(value);
        return value;
    }

    function toForeignCurrency(value = 0) {
        value /= currentRate;
        value = roundValueToSecondNum(value).toLocaleString('en-EN', {style: 'currency', currency: 'USD'});
        console.log(value);
        return value;
    }

    return {
        getCurrentRate: getCurrentRate,
        toLocalCurrency: toLocalCurrency,
        toForeignCurrency: toForeignCurrency
    }
}

function askRate() {
    let request;
    do {
        request = prompt('Введите текущий курс валют отношения USD к EUR', '1');
    } while (isNaN(request) || +request <= 0 || +request > 1000 || request === null);
    return roundValueToSecondNum(request);
}

function askValue(msg, currencyCode) {
    let request;
    let incorrectInput;
    do {
        request = prompt(`${msg}`, `100 ${currencyCode}`);
        incorrectInput = false;
        if (request === null) {
            continue;
        }
        const parts = request.split(" ");
        if (parts.length < 2 || parts[1].toUpperCase() !== currencyCode) {
            incorrectInput = true;
            continue;
        }
        request = parseFloat(request);
    } while (isNaN(request) || +request < 1 || request === null || incorrectInput);
    return roundValueToSecondNum(request);
}

function startApp() {
    const isRate = askRate();
    if (isRate) {
        const converter = createCurrencyConverter(isRate);
        let currentValue = converter.toLocalCurrency(
            askValue(
                'Введите сумму USD, которую желаете обменять на EUR\nМинимальное значение: 1 USD',
                'USD'
            )
        );
        alert(`Согласно курса (${converter.getCurrentRate()}), вы получите: ${currentValue}`);
        currentValue = converter.toForeignCurrency(
            askValue(
                'Введите сумму EUR, которую желаете обменять на USD\nМинимальное значение: 1 EUR',
                'EUR'
            )
        );
        alert(`Согласно курса (${converter.getCurrentRate()}), вы получите: ${currentValue}`);
    }
}

startApp();