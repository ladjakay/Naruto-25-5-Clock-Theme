// script.js - Pomodoro Timer Logic
let breakLength = 5;
let sessionLength = 25;
let timeLeft = 1500;
let isRunning = false;
let currentMode = "Session"; // "Session" or "Break"
let timerInterval = null;

const breakLengthEl = document.getElementById("break-length");
const sessionLengthEl = document.getElementById("session-length");
const timeLeftEl = document.getElementById("time-left");
const timerLabelEl = document.getElementById("timer-label");
const beepAudio = document.getElementById("beep");

// Format Seconds to MM:SS
function formatTime(seconds) {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
}

// Tick Logic
function tick() {
  if (timeLeft === 0) {
    beepAudio.currentTime = 0;
    const playPromise = beepAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(e => console.log('Audio error:', e));
    }
    if (currentMode === "Session") {
      currentMode = "Break";
      timerLabelEl.textContent = "Break";
      timeLeft = breakLength * 60;
    } else {
      currentMode = "Session";
      timerLabelEl.textContent = "Session";
      timeLeft = sessionLength * 60;
    }
    timeLeftEl.textContent = formatTime(timeLeft);
  } else {
    timeLeft--;
    timeLeftEl.textContent = formatTime(timeLeft);
    if (timeLeft === 0) {
      beepAudio.currentTime = 0;
      const playPromise = beepAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.log('Audio error:', e));
      }
    }
  }
}
