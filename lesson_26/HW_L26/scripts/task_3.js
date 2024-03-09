// task 3

function roundValueToSecondNum(value) {
    return Math.round(value * 100) / 100;
}

// variant 1

function startAppV1() {
    const prices = [100, 200, 300, 400, 500];
    const priceIncreasePercentage = 1.1; // 1 + 10% / 100%
    prices.forEach((price, index, arr) => {  // result: modified array
        arr[index] = roundValueToSecondNum(price * priceIncreasePercentage);
    })
    console.log('[V1] prices:', prices);
}

// variant 2

function increasePrice(priceArray, markupPercentage){
    return priceArray.map((element) => roundValueToSecondNum(element * markupPercentage));
}

function startAppV2() {
    const prices = [100, 200, 300, 400, 500]; // original prices
    const priceIncreasePercentage = 1.1; // 1 + 10% / 100%
    const increasedPrices = increasePrice(prices, priceIncreasePercentage); // result: new array
    console.log('[V2] increasedPrices:', increasedPrices);
}

startAppV1();
startAppV2();