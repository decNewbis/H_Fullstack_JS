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

function setProperties(currentCircle) {
    return function(event) {
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
        currentCircle.style.width = `${newDiameter}px`;
        currentCircle.style.height = `${newDiameter}px`;
        currentCircle.style.backgroundColor = `${newColor}`;
        if (pageObj.modal.classList.contains('modal__open')) {
            pageObj.modal.classList.toggle('modal__open');
        }
    }
}

function openProperties(event) {
    event.preventDefault();
    const currentCircle = this;
    if (!pageObj.modal.classList.contains('modal__open')) {
        pageObj.modal.classList.toggle('modal__open');
    }
    pageObj.modalElementDiameter.value = `${parseInt(currentCircle.style.width)}`;
    pageObj.modalElementColor.value = parseRGB(currentCircle.style.backgroundColor);
    const setProp = setProperties(currentCircle);
    pageObj.updateBtn.addEventListener('click', setProp, {once: true});
    pageObj.closeModalBtn.forEach((element) => {
        element.addEventListener('click', closeEvent({
                elementOfEvent: pageObj.updateBtn,
                funcOfEvent: setProp
            }), {once: true}
        );
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeEvent({
                elementOfEvent: pageObj.updateBtn,
                funcOfEvent: setProp
            });
        }
    }, {once: true});
}

function onMobileMode({currentCircle, currentRadius}) {
    return function(event) {
        currentCircle.style.left = `${event.pageX - currentRadius}px`;
        currentCircle.style.top = `${event.pageY - currentRadius}px`;
    }
}

function offMobileMode({elementOfEvent, funcOfEvent, currentCircle}) {
    return function() {
        elementOfEvent.removeEventListener('mousemove', funcOfEvent);
        currentCircle.classList.toggle('mobile-mode__on', false);
    }
}

function setMobileMode(currentCircle) {
    return function(event) {
        const currentRadius = parseInt(currentCircle.style.width) / 2;
        currentCircle.style.left = `${event.pageX - currentRadius}px`;
        currentCircle.style.top = `${event.pageY - currentRadius}px`;
        currentCircle.classList.toggle('mobile-mode', true);
        currentCircle.classList.toggle('mobile-mode__on', true);
        const setOnMobileMode = onMobileMode({
            currentCircle: currentCircle,
            currentRadius: currentRadius
        });
        pageObj.paintingArea.addEventListener('mousemove', setOnMobileMode);
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                offMobileMode({
                    elementOfEvent: pageObj.paintingArea,
                    funcOfEvent: setOnMobileMode,
                    currentCircle: currentCircle
                })();
            }
        }, {once: true});
        pageObj.paintingArea.addEventListener('mouseleave', offMobileMode({
                elementOfEvent: pageObj.paintingArea,
                funcOfEvent: setOnMobileMode,
                currentCircle: currentCircle
            }), {once: true});
    }
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
    circle.addEventListener('click', setMobileMode(circle));
    pageObj.palette.append(circle);
}

function startApp() {
    pageObj.paintingArea.addEventListener('dblclick', createCircle);
}

function closeEvent({elementOfEvent, funcOfEvent}) {
    return function() {
        pageObj.modal.classList.toggle('modal__open', false);
        elementOfEvent.removeEventListener('click', funcOfEvent);
    }
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