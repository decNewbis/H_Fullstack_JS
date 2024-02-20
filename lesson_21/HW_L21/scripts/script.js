// task 1

function getAffordableTripInfo(objectDictionary, budget) {
    let resultString = '';
    for (let key in objectDictionary) {
        if (objectDictionary[key] <= +budget) {
            resultString += `${key}: ${objectDictionary[key]}$\n`
        }
    }
    return resultString;
}

function getCountryNames(objectDictionary) {
    return Object.keys(objectDictionary).join(', ');
}

function getCustomerBudget() {
    return prompt(
        'Введите сумму бюджета в $, ' +
        'на который вы расичтываете приобрести билеты.', '500'
    );
}

function getCustomerTrip(countries) {
    return prompt(
        `Введите название страны из списка на английском языке, ` +
        `которую планируете посетить:\n${countries}`
    );
}

const TRIP_DICTIONARY = {
    'Ukraine': 500,
    'Italy': 1500,
    'Thailand': 1000,
    'USA': 1200,
    'Brazil': 1350,
    'Japan': 2000,
    'France': 1700
};

let affordableTrip = getCountryNames(TRIP_DICTIONARY);
let customerTrip;
let tripCost;

alert(`Здравствуйте! На данный момент у насть есть путевки в следующие страны: \n${affordableTrip}`);

let customerBudget = getCustomerBudget();
if (customerBudget) {
    while (!customerTrip) {
        customerTrip = getCustomerTrip(affordableTrip);
        if (customerTrip === null) {
            alert('Вы ничего не выбрали, попробуем в другой раз.');
            break;
        }
        tripCost = TRIP_DICTIONARY[customerTrip];
        if (tripCost) {
            if (tripCost <= +customerBudget) {
                alert(
                    `Для поездки в ${customerTrip} стоимостью ${tripCost}$ вам `+
                    `хватит вашего бюджета (${customerBudget}$)`
                );
            } else {
                affordableTrip = getAffordableTripInfo(TRIP_DICTIONARY, customerBudget);
                alert(
                    `К сожалению, вашего бюджета (${customerBudget}$) не достаточно для поездки в ${customerTrip}, ` +
                `но вы можете выбрать другую страну из подходящих по стоимости к вашему бюджету: \n${affordableTrip}`
                );
                // reset customerTrip value
                customerTrip = '';
            }
        } else {
            alert(
                'К сожалению такой страны нет в списке, либо не верно ввели название. Перезагрузите страницу ' +
                'и попробуйте снова.'
            );
        }
    }
} else {
    alert('Вы ничего не выбрали, попробуем в другой раз.');
}


// task 2

const DISCOUNT_DICTIONARY = {
    'NEWYEAR': 20,
    'BLACKFRIDAY': 30,
    'SUMMERSALE': 15
}

function totalCost(cost, discount, amount) {
    let tempDiscount = DISCOUNT_DICTIONARY[discount];
    let tempCost;
    if (tempDiscount) {
        tempCost = (cost * amount * (100 - tempDiscount) / 100);
    } else {
        // default discount 5%
        tempCost = (cost * amount * 0.95);
    }
    // additional discount if cost more then 1000
    if (tempCost > 1000) {
        tempCost *= 0.9;
    }
    // additional discount if more then 3 tickets
    if (amount >= 3) {
        tempCost *= 0.95;
    }
    return tempCost.toFixed(2);
}

if (customerBudget && customerTrip && tripCost) {
    let amountTicket = prompt('Сколько билетов вы желаете приобрести?', '1');

    if (!+amountTicket) {
        amountTicket = 1;
    }
    alert(
        `Стоимость ваших билетов в количестве ${amountTicket} шт. составляет: ` +
        `${totalCost(tripCost, '',amountTicket)}$ \nс учетом скидок составляет: `+
        `\nна новый год: ${totalCost(tripCost, 'NEWYEAR',amountTicket)}$` +
        `\nна черную пятницу: ${totalCost(tripCost, 'BLACKFRIDAY',amountTicket)}$` +
        `\nна летнюю распродажу: ${totalCost(tripCost, 'SUMMERSALE',amountTicket)}$`
    );
}