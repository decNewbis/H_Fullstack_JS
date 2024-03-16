// task 1. Weather

function roundValueToSecondNum(value) {
    return Math.round(value * 100) / 100;
}

function toCapitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

function CreateWeekObj(weekTemps) {
    this.weekData = weekTemps;
    this.getMinTemp = function() {
        return Math.min(...Object.values(this.weekData));
    };
    this.getMaxTemp = function() {
        return Math.max(...Object.values(this.weekData));
    };
    this.getAvgTemp = function() {
        const tempArray = Object.values(this.weekData);
        const sum = tempArray.reduce((acc, currentValue) => acc + currentValue, 0);
        return roundValueToSecondNum(sum / tempArray.length);
    };
    this[Symbol.toPrimitive] = (hint) => {
        if (hint === 'number') {
            return this.getAvgTemp();
        }
        if (hint === 'string') {

            return `(${
                Object.keys(this.weekData)
                .map((value) => toCapitalize(value.slice(0, 2)))
                .join('-')
            })`;
        }
        return null
    }
}

function startApp() {
    const weekTemperatures = {
        sunday: 6.0,
        monday: 6.5,
        tuesday: 7.5,
        wednesday: 5.5,
        thursday: 4.5,
        friday: 6.5,
        saturday: 8.0
    };
    const weekObj = new CreateWeekObj(weekTemperatures);
    console.log('weekObj:', weekObj);
    console.log('min temperature:', weekObj.getMinTemp());
    console.log('max temperature:', weekObj.getMaxTemp());
    console.log('average temperature:', weekObj.getAvgTemp());
    console.log('to Number:', Number(weekObj));
    console.log('to String:', String(weekObj));
}

startApp();
