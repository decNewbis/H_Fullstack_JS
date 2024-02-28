// task 2
// Roulette

function getBalance() {
    let tempBalance;
    do {
        tempBalance = prompt('Введите сумму Вашего баланса', '100');
        if (tempBalance === null) {
            return tempBalance;
        }
    } while(isNaN(tempBalance));
    return Math.round(+tempBalance);
}

function getBet(tempMinBet, tempBalance) {
    let tempBet;
    do {
        tempBet = prompt(
            `Ваш баланс: ${tempBalance}$\nСделайте свою ставку. Введите сумму ставки, минимальная сумма` +
            `ставки ${tempMinBet}$`,`${tempMinBet}`
        );
        if (tempBet === null) {
            return tempBet;
        }
    } while(!+tempBet || +tempBet < 10);
    return Math.round(+tempBet);
}

function getField() {
    let tempField;
    do {
        tempField = prompt(
            'Сделайте свою ставку: \n0 - на Черное поле\n1 - на красное поле',
            '0'
        );
        if (tempField === null) {
            return tempField;
        }
    } while((!+tempField && +tempField !== 0) || (+tempField < 0 && +tempField > 1));
    return Math.round(+tempField);
}

function spinRoulette(tempBet, tempField) {
    // black = 0, red = 1
    const isRed = Math.round(Math.random());
    const message = isRed ? 'Выпало Красное!' : 'Выпало Черное!'
    if (isRed === tempField) {
        tempBet *= 2;
        alert(`${message}\nПоздравляем, Вы выиграли и ваша ставка удваивается!`);
    } else {
        tempBet *= 0;
        alert(`${message}\nК сожалению, Вы проиграли. Не расстраивайтесб, повезет в другой раз.`);
    }
    return tempBet;
}

const isAgree = confirm('Давай сыграем в увлекательную игру под названием "Рулетка"?');
if (isAgree) {
    let userBalance = getBalance();
    // set default min bet
    let minBet = 10;
    while (userBalance >= minBet) {
        let userBet = getBet(minBet, userBalance);
        if (!userBet) {
            alert(`Ставка не сделана, жаль Вы уходите от нас. Остаток Вашего баланса ${userBalance}$.` +
                `Спасибо за игру.`);
            break;
        }
        let userField = getField();
        if (userField === null) {
            alert(`Поле не выбрано, жаль что Вы уходите от нас. Остаток Вашего баланса ${userBalance}$.` +
                `Спасибо за игру.`);
            break;
        }
        userBalance -= userBet;
        let winningAmount = spinRoulette(userBet, userField);
        if (winningAmount) {
            userBalance += winningAmount;
        } else {
            // if user lose, the minimum bet increases on 10%
            minBet = Math.ceil(minBet * 1.1);
        }
    }
    // if balance has not been entered
    if (userBalance === null) {
        userBalance = 0;
    }
    alert(`Игра окончена.\nНедостаточно денег на вешем балансе.\nВаш остаточный баланс: ${userBalance}$`);
} else {
    alert('Уже покидаете нас? Приходите еще.');
}