import browser from 'webextension-polyfill';

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

function changeSelectedTime(time: number) {
  browser.storage.local.set({
    selectedTime: time,
  });
}

export { handleStartTimer, changeSelectedTime };
