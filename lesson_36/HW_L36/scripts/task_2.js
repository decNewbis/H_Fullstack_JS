// task 2

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function parseRGB(value) {
    value = value.slice(4, -1).split(',');
    return `#${value.map((element) => {
        return (+element).toString(16).padStart(2, '0');
    }).join('')}`;
}

function setProperties(event) {
    event.preventDefault();
    const minDiameterValue = 5;
    const maxDiameterValue = 1024;
    let newDiameter = document.getElementById('diameter').value;
    const newColor = document.getElementById('color').value;
    if (newDiameter < minDiameterValue) {
        newDiameter = 5;
    } else if (newDiameter > maxDiameterValue) {
        newDiameter = 1024;
    }
    this.currentCircle.style.width = `${newDiameter}px`;
    this.currentCircle.style.height = `${newDiameter}px`;
    this.currentCircle.style.backgroundColor = `${newColor}`;
    // this.currentCircle.style.opacity = 0.5;
    this.modal.style.display = 'none';
}

function openProperties(event) {
    event.preventDefault();
    const modal = document.getElementById('modal');
    const currentCircle = this;
    const updateBtn = document.getElementById('updateBtn');
    modal.style.display = 'flex';
    document.getElementById('diameter').setAttribute(
        'value',
        `${parseInt(currentCircle.style.width)}`
    );
    document.getElementById('color').setAttribute(
        'value',
        parseRGB(currentCircle.style.backgroundColor)
    );
    const setProp = setProperties.bind({currentCircle: currentCircle, modal: modal});
    updateBtn.addEventListener('click', setProp, {once: true});
    const closeModalBtn = document.querySelectorAll('.close-event');
    closeModalBtn.forEach((element) => {
        element.addEventListener('click', closeEvent.bind(
            {updateBtn: updateBtn, setProperties: setProp}),
            {once: true}
        );
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeEvent.bind({updateBtn: updateBtn, setProperties: setProp})();
        }
    }, {once: true});
}

function onMobileMode(event) {
    const currentDiameter = parseInt(this.currentCircle.style.width);
    this.currentCircle.style.left = `${event.pageX - currentDiameter / 2}px`;
    this.currentCircle.style.top = `${event.pageY - currentDiameter / 2}px`;
}

function offMobileMode(event) {
    this.elementOfEvent.removeEventListener('mousemove', this.funcOfEvent);
    this.currentCircle.style.pointerEvents = 'auto';
    this.currentCircle.style.zIndex = 'unset';
}

function setMobileMode(event) {
    const paintingArea = document.getElementById('paintingArea');
    const currentCircle = this.currentCircle;
    currentCircle.style.position = 'absolute';
    const currentDiameter = parseInt(this.currentCircle.style.width);
    currentCircle.style.left = `${event.pageX - currentDiameter / 2}px`;
    currentCircle.style.top = `${event.pageY - currentDiameter / 2}px`;
    currentCircle.style.opacity = '0.5';
    currentCircle.style.zIndex = '5';
    this.currentCircle.style.pointerEvents = 'none';
    // const setOnMobileMode = onMobileMode.bind({currentCircle: currentCircle});
    const setOnMobileMode = onMobileMode.bind({currentCircle: currentCircle});
    // currentCircle.addEventListener('mousemove', setOnMobileMode);
    paintingArea.addEventListener('mousemove', setOnMobileMode);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            offMobileMode.bind({
                elementOfEvent: paintingArea,
                funcOfEvent: setOnMobileMode,
                currentCircle: currentCircle
            })();
        }
    },{once: true});
    // const paintingArea = document.getElementById('paintingArea');
    paintingArea.addEventListener('mouseleave', (event) => {
            offMobileMode.bind({
                elementOfEvent: paintingArea,
                funcOfEvent: setOnMobileMode,
                currentCircle: currentCircle})();
    }, {once: true});

    // this.currentCircle.style.left = `${event.pageX - currentDiameter / 2}px`;
    // this.currentCircle.style.top = `${event.pageY - currentDiameter / 2}px`;
}

function createCircle(event) {
    const circle = document.createElement('div');
    const radius = randomNum(10, 100);
    circle.className = 'circle';
    circle.style.backgroundColor =
        `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
    circle.style.width = `${radius}px`;
    circle.style.height = `${radius}px`;
    circle.addEventListener('contextmenu', openProperties);
    circle.addEventListener('click', setMobileMode.bind({currentCircle: circle}));
    const palette = document.getElementById('paintingPalette');
    palette.append(circle);
}

const closeEvent = function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    this.updateBtn.removeEventListener('click', this.setProperties);
}

function startApp() {
    const paintingArea = document.getElementById('paintingArea');
    paintingArea.addEventListener('dblclick', createCircle);
}

startApp();