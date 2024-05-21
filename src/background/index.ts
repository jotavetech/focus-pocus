import browser from "webextension-polyfill";
import { getStreakAndIncrement } from "./services/streak";
import { checkAndStopTimer } from "./services/timer";

let interval: NodeJS.Timeout;

browser.runtime.onMessage.addListener((message) => {
  if (message.type === "TIMER_STARTED") {
    startTimer();
  } else if (message.type === "TIMER_FINISHED") {
    stopTimer();
  }
});

function startTimer() {
  if (interval) clearInterval(interval);

  interval = setInterval(() => {
    browser.storage.local
      .get(["timer", "isRunning", "selectedTime"])
      .then((res) => {
        if (res.isRunning) {
          let timer = res.timer + 1;
          let isRunning = true;

          if (timer >= res.selectedTime) {
            isRunning = false;
            getStreakAndIncrement();
          }

          browser.storage.local.set({ timer, isRunning });

          if (!isRunning) {
            checkAndStopTimer();
            clearInterval(interval);
          }
        }
      });
  }, 1000);
}

function stopTimer() {
  if (interval) clearInterval(interval);
}

browser.storage.local
  .get(["timer", "isRunning", "selectedTime", "streak"])
  .then((res) => {
    browser.storage.local.set({
      timer: "timer" in res ? res.timer : 0,
      selectedTime: "selectedTime" in res ? res.selectedTime : 900,
      isRunning: "isRunning" in res ? res.isRunning : false,
      streak: "streak" in res ? res.streak : 0,
    });
  });
