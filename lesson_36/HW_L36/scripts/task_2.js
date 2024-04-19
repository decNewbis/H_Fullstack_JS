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

function resetForm() {
    pageObj.modalForm.reset();
    pageObj.modal.style.display = 'none';
}

function setProperties(event) {
    event.preventDefault();
    const minDiameterValue = 5;
    const maxDiameterValue = 1024;
    let newDiameter = pageObj.modalElementDiameter.value;
    const newColor = pageObj.modalElementColor.value;
    if (newDiameter < minDiameterValue) {
        newDiameter = 5;
    } else if (newDiameter > maxDiameterValue) {
        newDiameter = 1024;
    }
    this.currentCircle.style.width = `${newDiameter}px`;
    this.currentCircle.style.height = `${newDiameter}px`;
    this.currentCircle.style.backgroundColor = `${newColor}`;
    resetForm();
}

function openProperties(event) {
    event.preventDefault();
    const currentCircle = this;
    pageObj.modal.style.display = 'flex';
    pageObj.modalElementDiameter.setAttribute(
        'value',
        `${parseInt(currentCircle.style.width)}`
    );
    pageObj.modalElementColor.setAttribute(
        'value',
        parseRGB(currentCircle.style.backgroundColor)
    );
    const setProp = setProperties.bind({currentCircle: currentCircle});
    pageObj.updateBtn.addEventListener('click', setProp, {once: true});
    pageObj.closeModalBtn.forEach((element) => {
        element.addEventListener('click', closeEvent.bind(
            {elementOfEvent: pageObj.updateBtn, funcOfEvent: setProp}),
            {once: true}
        );
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeEvent.bind({elementOfEvent: pageObj.updateBtn, funcOfEvent: setProp})();
        }
    }, {once: true});
}

function onMobileMode(event) {
    this.currentCircle.style.left = `${event.pageX - this.currentRadius}px`;
    this.currentCircle.style.top = `${event.pageY - this.currentRadius}px`;
}

function offMobileMode() {
    this.elementOfEvent.removeEventListener('mousemove', this.funcOfEvent);
    this.currentCircle.style.pointerEvents = 'auto';
    this.currentCircle.style.zIndex = 'unset';
}

function setMobileMode(event) {
    const currentCircle = this.currentCircle;
    currentCircle.style.position = 'absolute';
    const currentRadius = parseInt(this.currentCircle.style.width) / 2;
    currentCircle.style.left = `${event.pageX - currentRadius}px`;
    currentCircle.style.top = `${event.pageY - currentRadius}px`;
    currentCircle.style.opacity = '0.5';
    currentCircle.style.zIndex = '5';
    this.currentCircle.style.pointerEvents = 'none';
    const setOnMobileMode = onMobileMode.bind({currentCircle: currentCircle, currentRadius: currentRadius});
    pageObj.paintingArea.addEventListener('mousemove', setOnMobileMode);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            offMobileMode.bind({
                elementOfEvent: pageObj.paintingArea,
                funcOfEvent: setOnMobileMode,
                currentCircle: currentCircle
            })();
        }
    },{once: true});
    pageObj.paintingArea.addEventListener('mouseleave', () => {
            offMobileMode.bind({
                elementOfEvent: pageObj.paintingArea,
                funcOfEvent: setOnMobileMode,
                currentCircle: currentCircle})();
    }, {once: true});
}

function createCircle() {
    const circle = document.createElement('div');
    const radius = randomNum(10, 100);
    circle.className = 'circle';
    circle.style.backgroundColor =
        `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
    circle.style.width = `${radius}px`;
    circle.style.height = `${radius}px`;
    circle.addEventListener('contextmenu', openProperties);
    circle.addEventListener('click', setMobileMode.bind({currentCircle: circle}));
    pageObj.palette.append(circle);
}

function startApp() {
    pageObj.paintingArea.addEventListener('dblclick', createCircle);
}

const closeEvent = function() {
    resetForm();
    this.elementOfEvent.removeEventListener('click', this.funcOfEvent);
}


const pageObj = {
    paintingArea: document.getElementById('paintingArea'),
    palette: document.getElementById('paintingPalette'),
    modal: document.getElementById('modal'),
    modalForm: this.modal.querySelector('form.modal__content'),
    modalElementDiameter: document.getElementById('diameter'),
    modalElementColor: document.getElementById('color'),
    updateBtn: document.getElementById('updateBtn'),
    closeModalBtn: document.querySelectorAll('.close-event'),
};

startApp();