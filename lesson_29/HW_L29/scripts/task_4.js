// task 4

function countTimeToFutureDate(futureDate) {
    const currentDate = Date.now();

    if (futureDate <= currentDate) {
        return 'Incorrect futureDate: futureDate <= currentDate';
    }
    const adjustmentByTimeZone = new Date().getTimezoneOffset() * 60 * 1000;
    // const currentDate = new Date();
    const difference = futureDate - currentDate + adjustmentByTimeZone;
    // (1000 ms * 60 sec * 60 min * 24 hours) -> ms/day
    const msPerDay = 1000 * 60 * 60 * 24;
    // (1000 ms * 60 sec * 60 min) -> ms/h
    const msPerHour =  1000 * 60 * 60;
    // (1000 ms * 60 sec -> ms/min
    const msPerMinutes = 1000 * 60;

    const days = Math.floor(difference / msPerDay);
    const hours = Math.floor((difference % msPerDay) / msPerHour);
    const minutes = Math.floor((difference % msPerHour) / msPerMinutes);
    const seconds = Math.floor((difference % msPerMinutes) / 1000);

    return {days, hours, minutes, seconds};
}

function startApp() {
    const futureDate1 = new Date('2024-03-18');
    const futureDate2 = new Date('2024-03-20');
    const futureDate3 = new Date('2025-03-19');
    console.log(countTimeToFutureDate(futureDate1));
    console.log(countTimeToFutureDate(futureDate2));
    console.log(countTimeToFutureDate(futureDate3));
}

startApp();