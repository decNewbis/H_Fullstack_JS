// timer

import {pageObj, timerDefault, inactiveStatusColor, activeStatusColor, backgroundStatusColor} from './constants.js';

function roundValueToSecondNum(value) {
    return Math.round(value * 100) / 100;
}

function getTimeRemaining() {
    const [currentHours, currentMinutes, currentSeconds] = pageObj.display.textContent
        .split(':')
        .map((element) => +element);
    return currentHours * 60 * 60 + currentMinutes * 60 + currentSeconds;
}

function activateElement(element, force) {
    element.classList.toggle('inactive', !force);
}

function setHidden(element, force) {
    element.classList.toggle('hidden', force);
}

function calcTimeRemaining(startValue) {
    return function() {
        let currentTotalSeconds = getTimeRemaining();
        setTimer(--currentTotalSeconds);
        pageObj.currentStatusProgress = roundValueToSecondNum(currentTotalSeconds * 100 / startValue);
        pageObj.statusBar.style.background = `linear-gradient(90deg, ${activeStatusColor} ${
            pageObj.currentStatusProgress
        }%, ${backgroundStatusColor} 0)`;
        if (currentTotalSeconds <= 0) {
            clearInterval(pageObj.stopTimer);
            const pauseBtn = pageObj.pauseBtn;
            const startBtn = pageObj.startBtn;
            const resetBtn = pageObj.resetBtn;
            setHidden(pauseBtn.closest('li'), true);
            setHidden(startBtn.closest('li'), false);
            activateElement(startBtn, false);
            activateElement(resetBtn, true);
            pageObj.statusBar.style.background = `linear-gradient(90deg, ${inactiveStatusColor} ${
                pageObj.currentStatusProgress
            }%, ${backgroundStatusColor} 0)`;
        }
    }
}

function startTimer() {
    const startTimerValue = pageObj.startTimerValue;
    const pauseBtn = pageObj.pauseBtn;
    const startBtn = pageObj.startBtn;
    const resetBtn = pageObj.resetBtn;
    const display = pageObj.display;
    pageObj['stopTimer'] = setInterval(calcTimeRemaining(startTimerValue), 1000);
    setHidden(pauseBtn.closest('li'), false);
    setHidden(startBtn.closest('li'), true);
    activateElement(resetBtn, false);
    activateElement(display, false);
    pageObj.statusBar.style.background = `linear-gradient(90deg, ${activeStatusColor} ${
        pageObj.currentStatusProgress
    }%, ${backgroundStatusColor} 0)`;
    pageObj.pauseBtn.addEventListener('click', () => {
        clearInterval(pageObj.stopTimer);
        setHidden(pauseBtn.closest('li'), true);
        setHidden(startBtn.closest('li'), false);
        activateElement(resetBtn, true);
        pageObj.statusBar.style.background = `linear-gradient(90deg, ${inactiveStatusColor} ${
            pageObj.currentStatusProgress
        }%, ${backgroundStatusColor} 0)`;
    }, {once: true});

}

function changeDisplayTimer() {
    setTimer();
    pageObj['startTimerValue'] = getTimeRemaining();
}

function checkAndSetMinMaxValue(value, minValue, maxValue) {
    if (value < minValue) {
        return minValue;
    } else if (value > maxValue) {
        return maxValue;
    } else {
        return value;
    }
}

function setTimer(setTotalSeconds = -1) {
    let totalSeconds = setTotalSeconds;
    let hours = +pageObj.setHours.value;
    let minutes = +pageObj.setMinutes.value;
    let seconds = +pageObj.setSeconds.value;
    let setDefaultFlag = false;
    const minValue = 0;
    const maxValue = 59;
    if (totalSeconds <= -1) {
        if ((hours <= 0) && (minutes <= 0) && (seconds <= 0)) {
            totalSeconds = timerDefault;
            setDefaultFlag = true;
        } else {
            hours = checkAndSetMinMaxValue(hours, minValue, 99);
            minutes = checkAndSetMinMaxValue(minutes, minValue, maxValue);
            seconds = checkAndSetMinMaxValue(seconds, minValue, maxValue);
            totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
        }
    }
    // recalculate timer values
    const calcHours = Math.trunc(totalSeconds / 3600);
    const calcMinutes = Math.trunc(totalSeconds / 60 % 60);
    const calcSeconds = Math.trunc(totalSeconds % 60);
    pageObj.display.textContent = `${
        String(calcHours).padStart(2, '0')
    }:${
        String(calcMinutes).padStart(2, '0')
    }:${
        String(calcSeconds).padStart(2, '0')
    }`;
    if (setDefaultFlag) pageObj['startTimerValue'] = getTimeRemaining();
}

function startApp() {
    setTimer();
    pageObj.setHours.addEventListener('change', changeDisplayTimer);
    pageObj.setMinutes.addEventListener('change', changeDisplayTimer);
    pageObj.setSeconds.addEventListener('change', changeDisplayTimer);
    pageObj.startBtn.addEventListener('click', startTimer);
    pageObj.resetBtn.addEventListener('click', () => {
        setTimer();
        pageObj.currentStatusProgress = 100;
        pageObj.statusBar.style.background = `linear-gradient(90deg, ${inactiveStatusColor} ${
            pageObj.currentStatusProgress
        }%, ${backgroundStatusColor} 0)`;
        activateElement(pageObj.resetBtn, false);
        activateElement(pageObj.startBtn, true);
        activateElement(display, true);
    });
    pageObj.closeModalBtn.forEach((element) => {
        element.addEventListener('click', () => {
            pageObj.modal.classList.toggle('modal__open', false);
        });
    });
    pageObj.display.addEventListener('click', () => {
        pageObj.modal.classList.toggle('modal__open', true);
    });
}

startApp();