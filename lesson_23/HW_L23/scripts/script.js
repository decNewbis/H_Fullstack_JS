function convertMinutes(amountMinutes) {
    let days = Math.trunc(amountMinutes / (60 * 24));
    let hours = Math.trunc(amountMinutes / 60);
    let minutes = (amountMinutes % 60);
    return `${days}д ${hours}ч ${minutes}м`;
}

function askMinutes() {
    let request;
    do {
        request = prompt('Введите количество минут, число от 0 до 6000', '0');
    } while (isNaN(request) || +request < 0 || +request > 6000 || request === null);
    return Math.round(request);
}

function startApp() {
    let rawMinutes = askMinutes();
    alert(`Число минут, которое вы ввели: ${rawMinutes}\nРезультат конвертирования: ${convertMinutes(rawMinutes)}`);
}

startApp();