// task 2

function roundValueToSecondNum(value) {
    return Math.round(value * 100) / 100;
}

function createInvestmentAccount(initialAmount = 0, annualInterestRate = 0) {
    const annualRate = annualInterestRate;
    let currentCapital = initialAmount;
    let periodOfForecast = 0;
    let forecastProfit = 0;

    function deposit(amount) {
        currentCapital += amount;
        console.log('deposit amount:', amount, 'currentCapital:', currentCapital);
    }

    function withdraw(amount) {
        if (amount <= currentCapital) {
            currentCapital -= amount;
            console.log('withdraw amount:', amount, 'currentCapital:', currentCapital);
        } else {
            const msg = 'Недостаточно средств на счету! Попробуйте в другой раз.'
            console.log(msg);
            alert(msg)
        }
    }

    function calculateProfit(years) {
        periodOfForecast = years;
        // формула сложного процента
        // A = P * (1 + r / n)^t
        // A - результат
        // Р - основная сумма
        // r - годовая процентная ставка, выраженная в виде десятичной дроби
        // n - количество начислений процентов в год
        // t - расчетный период, выраженный в годах
        forecastProfit = +((currentCapital * Math.pow(1 + annualRate / (100 * 12), years)).toFixed(2));
        console.log('calculateProfit:', forecastProfit);
    }

    function getAccountInfo() {
        let msg =  `Текущий баланс вашего счета: ${
            currentCapital.toLocaleString('en-EN', {style: 'currency', currency: 'EUR'})
        }\nПроцентная ставка: ${
            annualRate
        }\nПрогнозный расчет прибыли за ${periodOfForecast} гг: ${
            forecastProfit.toLocaleString('en-EN', {style: 'currency', currency: 'EUR'})
        }`
        console.log('getAccountInfo:', msg);
        return msg
    }

    return {
        deposit: deposit,
        withdraw: withdraw,
        calculateProfit: calculateProfit,
        getAccountInfo: getAccountInfo
    }
}

function askDetails(msg, defaultValue, maxValue) {
    let request;
    do {
        request = prompt(`${msg}`, `${defaultValue}`);
        if (request === null) {
            continue;
        }
        request = parseFloat(request);
    } while (isNaN(request) || request <= 0 || +request > maxValue || request === null);
    return roundValueToSecondNum(request);
}

function startApp() {
    const myAccount = createInvestmentAccount(
        askDetails('Укажите значение стартового капитала\nМинимальное значение: 1', '1000'),
        askDetails(
            'Укажите значение годовой процентной ставки в процентах\nМинимум: 1\nМаксимум: 100',
            '1',
            100
        )
    );
    let isAgree = confirm('Желаете добавить дополнительную сумму к вашему вкладу?');
    if (isAgree) {
        myAccount.deposit(
            askDetails(
                'Укажите сумму, котору желаете добавить к вашему вкладу\nМинимум: 1\nМаксимум: 1000000',
                '1',
                1000000
            )
        );
    }
    isAgree = confirm('Желаете снять часть суммы с вашего вклада?');
    if (isAgree) {
        myAccount.withdraw(
            askDetails(
                'Укажите сумму, которую желаете снять с вашего вклада\nМинимум: 1\nМаксимум: 1000000',
                '1',
                1000000
            )
        );
    }
    isAgree = confirm('Желаете расчитать прогнозный доход?');
    if (isAgree) {
        myAccount.calculateProfit(
            askDetails(
                'Укажите количство лет, за которое следует выполнить прогнозный расчет дохода по вашему ' +
                'вкладу\nМинимум: 1\nМаксимум: 25',
                '1',
                25
            )
        );
    }
    isAgree = confirm('Желаете посмотреть информацию о состоянии вашей учетной записи?');
    if (isAgree) {
        alert(myAccount.getAccountInfo());
    }
}

startApp();