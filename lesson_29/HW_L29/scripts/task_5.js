// task 5

function getAmountOfWorkDays(deadline) {
    let currentDate = new Date();
    deadline.setHours(0, 0, 0, 0);

    if (deadline <= currentDate) {
        return 'The deadline is overdue';
    }
    let amountDays = 0;

    while (currentDate < deadline) {
        const dayIndex = currentDate.getDay();
        if (dayIndex !== 0 && dayIndex !== 6) {
            amountDays++;
        }
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    }
    return amountDays;
}

function startApp() {
    const deadline1 = new Date('2024-03-19');
    const deadline2 = new Date('2024-03-18');
    const deadline3 = new Date('2025-03-19');
    console.log(getAmountOfWorkDays(deadline1));
    console.log(getAmountOfWorkDays(deadline2));
    console.log(getAmountOfWorkDays(deadline3));
}

startApp();
