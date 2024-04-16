// task 2

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function createCircle(event) {
    const circle = document.createElement('div');
    const radius = randomNum(10, 100);
    circle.className = 'circle';
    circle.style.backgroundColor =
        `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
    circle.style.width = `${radius}px`;
    circle.style.height = `${radius}px`;
    const palette = document.getElementById('paintingPalette');
    palette.append(circle);
}

function startApp() {
    const paintingArea = document.getElementById('paintingArea');
    paintingArea.addEventListener('dblclick', createCircle);
}

startApp();