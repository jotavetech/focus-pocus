import { getStreakAndIncrement } from "./services/streak";

chrome.alarms.create("timeRunner", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "timeRunner") {
    chrome.storage.local.get(["timer", "isRunning", "selectedTime"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;

        console.log("safa3");

        if (timer === 60 * res.selectedTime) {
          timer = 0;
          isRunning = false;
          getStreakAndIncrement();
        }

        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

chrome.storage.local.get(["timer", "isRunning", "selectedTime"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    selectedTime: "selectedTime" in res ? res.selectedTime : 25,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});
