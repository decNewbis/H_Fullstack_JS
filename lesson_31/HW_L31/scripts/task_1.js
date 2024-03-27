// task 1. Weather

class WeeklyWeather {
    constructor(su, mo, tu, we, th, fr, sa) {
        this.sunday = su;
        this.monday = mo;
        this.tuesday = tu;
        this.wednesday = we;
        this.thursday = th;
        this.friday = fr;
        this.saturday = sa;
    }

    roundValueToSecondNum(value) {
        return Math.round(value * 100) / 100;
    }

    toCapitalize(str) {
        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    }

    print() {
        const dividerLine = ''.padStart(23, '-');
        for (let [key, value] of Object.entries(this)) {
            console.log(dividerLine);
            console.log(`| ${
                this.toCapitalize(key).padEnd(10, ' ')
            }| ${
                value.toString().padStart(5, ' ').padEnd(8, ' ')
            }|`);
        }
        console.log(dividerLine);
    }

    getMinTemp() {
        return Math.min(...Object.values(this));
    }

    getMaxTemp() {
        return Math.max(...Object.values(this));
    }

    getAvgTemp() {
        const tempArray = Object.values(this);
        const sum = tempArray.reduce((acc, currentValue) => acc + currentValue, 0);
        return this.roundValueToSecondNum(sum / tempArray.length);
    }
}

function startApp() {
    const weekTemperatures = [6.0, 6.5, 7.5, 5.5, 4.5, 6.5, 8.0];
    const weeklyWeather = new WeeklyWeather(...weekTemperatures);
    console.log('weekObj:', weeklyWeather);
    console.log('min temperature:', weeklyWeather.getMinTemp());
    console.log('max temperature:', weeklyWeather.getMaxTemp());
    console.log('average temperature:', weeklyWeather.getAvgTemp());
    weeklyWeather.print();
}

startApp();
