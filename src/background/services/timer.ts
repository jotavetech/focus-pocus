import { resetStreak } from "./streak";

function stopTimer() {
  chrome.storage.local.set({
    isRunning: false,
    timer: 0,
  });
}

function handleStartTimer() {
  chrome.storage.local.get(["isRunning"]).then((res) => {
    if (res.isRunning) {
      stopTimer();
      resetStreak();
      return;
    }

    chrome.storage.local.set({
      isRunning: true,
    });
  });
}

function changeSelectedTime(time: number) {
  chrome.storage.local.set({
    selectedTime: time,
  });
}

export { handleStartTimer, changeSelectedTime };
