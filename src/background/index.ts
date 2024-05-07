chrome.alarms.create("timeRunner", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "timeRunner") {
    chrome.storage.local.get(["timer", "isRunning", "selectedTime"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;

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

function pushFinishedSessionNotification() {
  chrome.notifications.create({
    type: "basic",
    iconUrl: chrome.runtime.getURL("/assets/logo/icon-64.png"),
    title: "Finished a session!",
    message: `Now you can take a break!`,
  });
}

async function getStreakAndIncrement() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["streak"], (res) => {
      const streak = res.streak || 0;

      chrome.storage.local.set({ streak: streak + 1 }, () => {
        resolve(streak + 1);
      });
    });
  }).then(() => pushFinishedSessionNotification());
}

function resetStreak() {
  chrome.storage.local.set({ streak: 0 });
}

chrome.storage.local.get(["timer", "isRunning", "selectedTime", ""], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    selectedTime: "selectedTime" in res ? res.selectedTime : 25,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});
