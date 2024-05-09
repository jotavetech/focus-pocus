import { getStreakAndIncrement } from "./services/streak";
import browser from 'webextension-polyfill';

browser.alarms.create("timeRunner", {
  periodInMinutes: 1 / 60,
});

browser.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "timeRunner") {
    browser.storage.local.get(["timer", "isRunning", "selectedTime"]).then((res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;

        if (timer === 60 * res.selectedTime) {
          timer = 0;
          isRunning = false;
          getStreakAndIncrement();
        }

        browser.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

browser.storage.local.get(["timer", "isRunning", "selectedTime"]).then((res) => {
  browser.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    selectedTime: "selectedTime" in res ? res.selectedTime : 25,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});
