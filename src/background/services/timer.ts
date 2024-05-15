import browser from "webextension-polyfill";
import playSound from "../../utils/play-popup-sounds";
import { resetStreak } from "./streak";

function stopTimer() {
  browser.storage.local.set({
    isRunning: false,
    timer: 0,
  });
}

function handleStartTimer() {
  browser.storage.local.get(["isRunning"]).then((res) => {
    if (res.isRunning) {
      stopTimer();
      resetStreak();
      playSound("giveup");
      return;
    }

    browser.storage.local.set({
      isRunning: true,
    });
  });
}

function changeSelectedTime(seconds: number, label: string) {
  browser.storage.local.set({
    selectedTime: seconds,
    timeLabel: label,
  });
}

function checkAndStopTimer() {
  browser.storage.local.get(["timer", "selectedTime"]).then((res) => {
    if (res.timer >= res.selectedTime) {
      stopTimer();
      playSound("finished");
      browser.runtime.sendMessage({ type: "TIMER_FINISHED" });
    }
  });
}

export { changeSelectedTime, checkAndStopTimer, handleStartTimer, stopTimer };
