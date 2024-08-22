// script.js
let startPauseBtn = document.getElementById('startPauseBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');
let display = document.getElementById('display');
let lapsContainer = document.getElementById('laps');

let startTime, updatedTime, difference;
let interval;
let isRunning = false;
let laps = [];
let lastLapTime = 0;

startPauseBtn.addEventListener('click', function() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 10);
        startPauseBtn.textContent = 'Pause';
        isRunning = true;
    } else {
        clearInterval(interval);
        startPauseBtn.textContent = 'Start';
        isRunning = false;
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(interval);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    difference = 0;
    display.textContent = '00:00:00:00';
    laps = [];
    lastLapTime = 0;
    renderLaps();
});

lapBtn.addEventListener('click', function() {
    if (isRunning) {
        let lapTime = difference - lastLapTime;
        lastLapTime = difference;
        laps.push(lapTime);
        renderLaps();
    }
});

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(n) {
    return n < 10 ? '0' + n : n;
}

function renderLaps() {
    lapsContainer.innerHTML = '';
    let totalTime = 0;

    laps.forEach((lap, index) => {
        totalTime += lap;
        let lapTimeString = formatTime(lap);
        let totalTimeString = formatTime(totalTime);

        let lapDiv = document.createElement('div');
        lapDiv.textContent = `Lap ${index + 1}: ${lapTimeString} | Total: ${totalTimeString}`;
        lapsContainer.appendChild(lapDiv);
    });
}

function formatTime(time) {
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}
