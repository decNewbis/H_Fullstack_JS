const pageObj = {
    display: document.getElementById('display'),
    setHours: document.getElementById('set-hours'),
    setMinutes: document.getElementById('set-minutes'),
    setSeconds: document.getElementById('set-seconds'),
    pauseBtn: document.getElementById('pauseBtn'),
    startBtn: document.getElementById('startBtn'),
    resetBtn: document.getElementById('resetBtn'),
    statusBar: document.getElementById('statusBar'),
    modal: document.getElementById('modal'),
    closeModalBtn: document.querySelectorAll('.close-event'),
    currentStatusProgress: 100,
}

// timerDefault - seconds
const timerDefault = 5 * 60;
const inactiveStatusColor = '#059305';
const activeStatusColor = '#ff4a4a';
const backgroundStatusColor = '#aaa';

export {pageObj, timerDefault, inactiveStatusColor, activeStatusColor, backgroundStatusColor};