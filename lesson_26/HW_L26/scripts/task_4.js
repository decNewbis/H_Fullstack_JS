// task 4

function startApp() {
    const numbers = [45, 80, 32, 100, 105];
    const isOver100Exist = numbers.some((element) => element > 100);
    console.log('isOver100Exist:', isOver100Exist);
}

startApp();