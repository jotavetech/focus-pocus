import changePopupColor from "../utils/change-popup-color";
import playSound from "../utils/play-popup-sounds";

const configButton = document.querySelector("#config") as HTMLElement;
let selectTime = document.querySelector("#select-time") as HTMLSelectElement;
let timer = document.querySelector("#timer-counter") as HTMLElement;
let startButton = document.querySelector("#start") as HTMLElement;
let streakCounter = document.querySelector("#streak-counter") as HTMLElement;

chrome.storage.local.get(["streak"], (res) => {
  if (res.streak) {
    streakCounter.innerHTML = res.streak || 0;
  }
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.streak) {
    streakCounter.innerHTML = changes.streak.newValue;
  }
});

function changeAppStyleMode(isRunning: boolean) {
  changePopupColor(isRunning);
  startButton.innerHTML = isRunning ? "GIVE UP!" : "START FOCUSING";
  selectTime.disabled = isRunning;
}

function updateTimer() {
  chrome.storage.local.get(["selectedTime"], (res) => {
    selectTime.value = res.selectedTime;
  });

  chrome.storage.local.get(["timer", "selectedTime", "isRunning"], (res) => {
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

    if (+minutes <= 0 && +seconds <= 1) {
      stopTimer(true);
    }
  });
}

function killStreak() {
  chrome.storage.local.set({ streak: 0 });
  streakCounter.innerHTML = "0";
}

function updateStreakWhenPopupIsOpen() {
  chrome.storage.local.get(["streak"], (res) => {
    if (res.streak) {
      chrome.storage.local.set({ streak: res.streak + 1 });
    } else {
      chrome.storage.local.set({ streak: 1 });
    }

    streakCounter.innerHTML = res.streak + 1;
  });
}

function stopTimer(isFinished: boolean) {
  if (isFinished) {
    updateStreakWhenPopupIsOpen();
    playSound("finished");
  } else {
    playSound("giveup");
    killStreak();
  }

  chrome.storage.local.set({
    isRunning: false,
    timer: 0,
    selectedTime: selectTime.value,
  });

  changeAppStyleMode(false);
  timer.innerHTML = `${
    +selectTime.value <= 9 ? "0" + selectTime.value : selectTime.value
  }:00`;
}

function handleStartTimer() {
  playSound("button");

  chrome.storage.local.get(["isRunning"], (res) => {
    if (res.isRunning) {
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
  timer.innerHTML = `${minutes <= 9 ? "0" + minutes : minutes}:00`;
}

startButton.addEventListener("click", handleStartTimer);
selectTime.addEventListener("change", handleTimer);
configButton.onclick = () => chrome.runtime.openOptionsPage();

updateTimer();
setInterval(updateTimer, 1000);
