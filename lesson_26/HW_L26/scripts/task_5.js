// task 5

function startApp() {
    const nums = [1, 2, 3, 4, 5, -6, 7];
    const isEveryNumPositive = nums.every((element) => element >= 0);
    console.log('isEveryNumPositive', isEveryNumPositive);
}

startApp();