// task 2

function paddingDate(date) {
    return String(date).padStart(2, '0');
}

function formatter(date) {
    const year = date.getFullYear();
    const month = paddingDate(date.getMonth() + 1);
    const day = paddingDate(date.getDate());
    return `${year}-${month}-${day}`;
}

function getAmountOfDaysBetweenDates(date1, date2) {
    // (1000 ms * 60 sec * 60 min * 24 hours) -> ms/day
    return Math.floor((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
}

function startApp() {
    const firstDate = new Date('2024-03-17');
    const secondDate = new Date('2022-02-24');
    console.log(`firstDate:`, formatter(firstDate));
    console.log(`secondDate:`, formatter(secondDate));
    console.log(`Amount of days between dates: ${getAmountOfDaysBetweenDates(firstDate, secondDate)} day(s)`);
}

startApp();