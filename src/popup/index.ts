import browser from "webextension-polyfill";
import {
  changeSelectedTime,
  handleStartTimer,
} from "../background/services/timer";
import changePopupColor from "../utils/change-popup-color";
import playSound from "../utils/play-popup-sounds";

const configButton = document.querySelector("#config") as HTMLElement;
const selectTime = document.querySelector("#select-time") as HTMLSelectElement;
const timerDisplay = document.querySelector("#timer-counter") as HTMLElement;
const startButton = document.querySelector("#start") as HTMLElement;
const streakCounter = document.querySelector("#streak-counter") as HTMLElement;
const customInput = document.querySelector("#custom-input") as HTMLInputElement;

let isTimerRunning = false;

function changeAppStyleMode(isRunning: boolean) {
  changePopupColor(isRunning);
  startButton.innerHTML = isRunning ? "GIVE UP!" : "START FOCUSING";
  timerDisplay.style.pointerEvents = isRunning ? "none" : "auto";
  selectTime.disabled = isRunning;
  customInput.disabled = isRunning;
}

function updateTimer() {
  browser.storage.local
    .get(["timer", "selectedTime", "timeLabel", "isRunning", "streak"])
    .then((res) => {
      const { timer, selectedTime, timeLabel, isRunning, streak } = res;

      console.log("streak", streak);

      selectTime.value = selectedTime.toString() || "60";
      streakCounter.innerHTML = streak.toString() || "0";

      const options = Array.from(selectTime.options);
      const matchingOption = options.find(
        (option) => option.value === selectedTime.toString()
      );
      if (matchingOption) {
        matchingOption.selected = true;
      } else {
        updateSelectOption(selectedTime, timeLabel || "Custom Time");
      }

      const totalSecondsLeft = selectedTime - timer;
      if (totalSecondsLeft <= 0) {
        handleTimerEnd();
      } else {
        timerDisplay.innerHTML = formatTime(totalSecondsLeft);
      }
      isTimerRunning = isRunning;
      changeAppStyleMode(isRunning);
    });
}

function checkIfIsRunningAndSendAMessage() {
  browser.storage.local.get(["isRunning"]).then((res) => {
    if (res.isRunning) {
      browser.runtime.sendMessage({ type: "TIMER_STARTED" });
    }
  });
}

checkIfIsRunningAndSendAMessage();

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [
    hours > 0 ? `${hours < 10 ? "0" + hours : hours}` : "00",
    `${minutes < 10 ? "0" + minutes : minutes}`,
    `${seconds < 10 ? "0" + seconds : seconds}`,
  ];

  return parts.join(":");
}

function handleStartTimerButton() {
  playSound("button");
  const customTime = parseCustomTime();
  if (customTime !== null) {
    changeSelectedTime(customTime.totalSeconds, customTime.label);
    updateSelectOption(customTime.totalSeconds, customTime.label);
  }
  handleStartTimer();
}

function parseCustomTime() {
  if (customInput.style.display !== "none") {
    const timeParts = customInput.value.split(":").reverse();
    let totalSeconds = 0;
    const labelParts = [];

    if (timeParts.length >= 1 && !isNaN(parseInt(timeParts[0]))) {
      const seconds = parseInt(timeParts[0]);
      totalSeconds += seconds;
      if (seconds > 0) {
        labelParts.push(seconds + " S");
      }
    }

    if (timeParts.length >= 2 && !isNaN(parseInt(timeParts[1]))) {
      const minutes = parseInt(timeParts[1]);
      totalSeconds += minutes * 60;
      if (minutes > 0) {
        labelParts.unshift(minutes + " MIN");
      }
    }

    if (timeParts.length >= 3 && !isNaN(parseInt(timeParts[2]))) {
      const hours = parseInt(timeParts[2]);
      totalSeconds += hours * 3600;
      if (hours > 0) {
        labelParts.unshift(hours + " HOUR" + (hours > 1 ? "S" : ""));
      }
    }

    const label = labelParts.join(" ");
    if (totalSeconds > 0) {
      return { totalSeconds, label };
    }
  }
  return null;
}

function handleTimerSelect(e: Event) {
  const selectElement = e.target as HTMLSelectElement;
  const totalSeconds = parseInt(selectElement.value);
  const option = selectElement.options[selectElement.selectedIndex];
  const label = option.textContent || "";

  timerDisplay.innerHTML = formatTime(totalSeconds);
  changeSelectedTime(totalSeconds, label);
}

function applyCustomTime() {
  const timeData = parseCustomTime();
  if (timeData) {
    const { totalSeconds, label } = timeData;
    timerDisplay.innerHTML = formatTime(totalSeconds);
    updateSelectOption(totalSeconds, label);
    changeSelectedTime(totalSeconds, label);
  }
  customInput.style.display = "none";
  timerDisplay.style.display = "block";
}

function updateSelectOption(seconds: number, label: string) {
  let options = Array.from(selectTime.options).map((option) => ({
    value: parseInt(option.value),
    label: option.textContent || "",
  }));

  const newOption = { value: seconds, label };
  options = options.filter((option) => option.value !== newOption.value);
  options.push(newOption);
  options.sort((a, b) => a.value - b.value);

  selectTime.innerHTML = "";
  options.forEach((option) => {
    const optionElement = document.createElement("option") as HTMLOptionElement;
    optionElement.value = option.value.toString();
    optionElement.textContent = option.label;
    selectTime.appendChild(optionElement);
  });

  selectTime.value = seconds.toString();
}

function handleTimerEnd() {
  isTimerRunning = false;
  startButton.textContent = "START FOCUSING";
  selectTime.disabled = false;
  customInput.disabled = false;
  customInput.style.display = "none";
  timerDisplay.style.display = "block";
  timerDisplay.style.pointerEvents = "auto";
}

browser.storage.onChanged.addListener((changes) => {
  if (changes.streak && changes.streak.oldValue < changes.streak.newValue) {
    playSound("finished");
  }
  if (changes.timer && changes.timer.oldValue != changes.timer.newValue) {
    updateTimer();
  }
});

startButton.addEventListener("click", handleStartTimerButton);
selectTime.addEventListener("change", handleTimerSelect);
configButton.addEventListener("click", () => browser.runtime.openOptionsPage());

timerDisplay.addEventListener("click", () => {
  if (!isTimerRunning) {
    customInput.style.display = "block";
    timerDisplay.style.display = "none";
    customInput.value = timerDisplay.textContent || "00:00";
    customInput.focus();
  }
});

customInput.addEventListener("blur", applyCustomTime);
customInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    applyCustomTime();
  }
});

startButton.addEventListener("click", () => {
  isTimerRunning = !isTimerRunning;
  startButton.textContent = isTimerRunning ? "GIVE UP!" : "START FOCUSING";
  timerDisplay.style.pointerEvents = isTimerRunning ? "none" : "auto";
});

updateTimer();
