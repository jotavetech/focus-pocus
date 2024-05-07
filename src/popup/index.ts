import {
  changeSelectedTime,
  handleStartTimer,
} from "../background/services/timer";

import changePopupColor from "../utils/change-popup-color";
import playSound from "../utils/play-popup-sounds";

const configButton = document.querySelector("#config") as HTMLElement;
const selectTime = document.querySelector("#select-time") as HTMLSelectElement;
const timer = document.querySelector("#timer-counter") as HTMLElement;
const startButton = document.querySelector("#start") as HTMLElement;
const streakCounter = document.querySelector("#streak-counter") as HTMLElement;

function changeAppStyleMode(isRunning: boolean) {
  changePopupColor(isRunning);
  startButton.innerHTML = isRunning ? "GIVE UP!" : "START FOCUSING";
  selectTime.disabled = isRunning;
}

function updateTimer() {
  chrome.storage.local.get(
    ["timer", "selectedTime", "isRunning", "streak"],
    (res) => {
      selectTime.value = res.selectedTime || 25;
      streakCounter.innerHTML = res.streak || 0;

      let minutes = `${res.selectedTime - Math.ceil(res.timer / 60)}`.padStart(
        2,
        "0"
      );
      let seconds = "00";

      if (res.timer % 60 !== 0) {
        seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
      }

      timer.innerHTML = `${minutes}:${seconds}`;

      changeAppStyleMode(res.isRunning);
    }
  );
}

updateTimer();

chrome.storage.onChanged.addListener((changes) => {
  if (changes.streak && changes.streak.oldValue < changes.streak.newValue) {
    playSound("finished");
  }
  if (changes.timer.oldValue != changes.timer.newValue) {
    updateTimer();
  }
});

function handleStartTimerButton() {
  playSound("button");
  handleStartTimer();
}

function handleTimerSelect(e: Event) {
  const selectElement = e.target as HTMLSelectElement;
  const minutes = parseInt(selectElement.value);
  changeSelectedTime(minutes);

  timer.innerHTML = `${minutes <= 9 ? "0" + minutes : minutes}:00`;
}

startButton.addEventListener("click", handleStartTimerButton);
selectTime.addEventListener("change", handleTimerSelect);
configButton.addEventListener("click", () => chrome.runtime.openOptionsPage());
