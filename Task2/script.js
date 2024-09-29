let timer;
let isRunning = false;
let elapsedTime = 0;
let startTime;
let laps = [];

const displayElement = document.getElementById("display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps-list");

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 100);
    isRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    lapButton.disabled = false;
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  displayElement.textContent = "00:00:00";
  startButton.disabled = false;
  pauseButton.disabled = true;
  lapButton.disabled = true;
  laps = [];
  lapsList.innerHTML = "";
}

function recordLap() {
  const lapTime = formatTime(elapsedTime);
  laps.push(lapTime);
  const lapElement = document.createElement("li");
  lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
  lapsList.appendChild(lapElement);
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  displayElement.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((ms % 1000) / 10);

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0") +
    ":" +
    String(centiseconds).padStart(2, "0")
  );
}
