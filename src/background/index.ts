import browser from "webextension-polyfill";
import { getStreakAndIncrement } from "./services/streak";
import { checkAndStopTimer } from "./services/timer";

setInterval(() => {
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

        browser.storage.local.set({
          timer,
          isRunning,
        });

        if (!isRunning) {
          checkAndStopTimer();
        }
      }
    });
}, 1000);

browser.storage.local
  .get(["timer", "isRunning", "selectedTime"])
  .then((res) => {
    browser.storage.local.set({
      timer: "timer" in res ? res.timer : 0,
      selectedTime: "selectedTime" in res ? res.selectedTime : 900,
      isRunning: "isRunning" in res ? res.isRunning : false,
      streak: "streak" in res ? res.streak : 0,
    });
  });
