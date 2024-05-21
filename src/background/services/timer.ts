import browser from "webextension-polyfill";
import playSound from "../../utils/play-popup-sounds";

import { resetStreak } from "./streak";

function stopTimer() {
  browser.runtime.sendMessage({ type: "TIMER_FINISHED" });

  browser.storage.local.set({
    isRunning: false,
    timer: 0,
  });

  browser.action.setIcon({
    path: browser.runtime.getURL("assets/logo/icon-32.png"),
  });
}

function startTimer() {
  browser.storage.local.set({
    isRunning: true,
    timer: 0,
  });

  browser.runtime.sendMessage({ type: "TIMER_STARTED" });

  browser.action.setIcon({
    path: browser.runtime.getURL("assets/logo/icon-32-active.png"),
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

    startTimer();
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
    }
  });
}

export { changeSelectedTime, checkAndStopTimer, handleStartTimer, stopTimer };
