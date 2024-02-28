// task  1
// list of leap years from 1900 to 2100

let leapYear = [];
const isAgree = confirm('Task 1\nДавайте составим список високосных лет и посчитаем их количество в ' +
    'промежутке между 1900 годом и 2100 годом включительно.\n Вы готовы?')
if (isAgree) {
    for (let currentYear = 1900; currentYear <= 2100; currentYear++) {
        if ((currentYear % 4 === 0 && currentYear % 100 !== 0) ||
            (currentYear % 100 === 0 && currentYear % 400 === 0)) {
            leapYear.push(currentYear);
        }
    }

    if (leapYear.length) {
        alert(`В промежутке между 1900 годом и 2100 годом есть ${leapYear.length} високосных лет:\n${leapYear.join(', ')}`);
    }
}