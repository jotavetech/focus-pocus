import changePopupColor from "../utils/change-popup-color";
import playSound from "../utils/play-popup-sounds";

const addWebsiteButton = document.querySelector("#add-website") as HTMLElement;
const configButton = document.querySelector("#config") as HTMLElement;
let selectTime = document.querySelector("#select-time") as HTMLSelectElement;
let timer = document.querySelector("#timer-counter") as HTMLElement;
let startButton = document.querySelector("#start") as HTMLElement;

function changeAppStyleMode(isRunning: boolean) {
  changePopupColor(isRunning);
  startButton.innerHTML = isRunning ? "GIVE UP!" : "START FOCUSING";
  selectTime.disabled = isRunning;
}

function updateTimer() {
  chrome.storage.local.get(["timer", "selectedTime", "isRunning"], (res) => {
    let minutes = `${res.timerOption - Math.ceil(res.timer / 60)}`.padStart(
      2,
      "0"
    );
    let seconds = "00";

    if (res.timer % 60 !== 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
    }

    if (res.isRunning) {
      changeAppStyleMode(true);
      timer.innerHTML = `${minutes}:${seconds}`;
    }

    if (+minutes <= 0 && +seconds <= 0) {
      stopTimer(true);
    }
  });
}

updateTimer();
setInterval(updateTimer, 1000);

function stopTimer(isFinished: boolean) {
  if (isFinished) {
    playSound("finished");
  } else {
    playSound("giveup");
  }

  chrome.storage.local.set({
    isRunning: false,
    timer: 0,
    selectedTime: selectTime.value,
  });

  changeAppStyleMode(false);
}

function handleStartTimer() {
  playSound("button");

  chrome.storage.local.get(["isRunning"], (res) => {
    if (res.isRunning) {
      chrome.storage.local.set({ isRunning: false });
      stopTimer(false);
      return;
    }

    chrome.storage.local.set(
      {
        isRunning: true,
      },
      () => changeAppStyleMode(true)
    );
  });
}

function handleTimer(e: Event) {
  const selectElement = e.target as HTMLSelectElement;
  const minutes = parseInt(selectElement.value);
  chrome.storage.local.set({ selectedTime: minutes });
  timer.innerHTML = `${minutes}:00`;
}

startButton.addEventListener("click", handleStartTimer);
selectTime.addEventListener("change", handleTimer);
