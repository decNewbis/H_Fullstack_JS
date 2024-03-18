// task 3

function getAge(birthday) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    let years = currentYear - birthday.getFullYear();
    let months = currentMonth - birthday.getMonth();
    let days = currentDate.getDate() - birthday.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
        --years;
        months += 12;
        if (days < 0) {
            --months;
            days += new Date(currentYear, currentMonth, 0).getDate();
        }

    }
    let result = 'Your age: ';
    result += years ? `${years} years ` : '';
    result += months ? `${months} months ` : '';
    result += days ? `${days} days` : '';
    // wrong date
    result = years < 0 ? 'You will be born in the future! We are looking forward to seeing you =)' : result;
    // birthday today
    result = result === 'Your age: ' ? 'Happy birthday! Welcome to the world =)' : result;
    return result;
}

function startApp() {
    const birthday1 = new Date('2023-01-17');
    const birthday2 = new Date('2024-03-18');
    const birthday3 = new Date('2023-03-19');
    console.log(getAge(birthday1));
    console.log(getAge(birthday2));
    console.log(getAge(birthday3));
}

startApp();
