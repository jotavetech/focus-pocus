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
          updateStreak();
        }

        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

async function updateStreak() {
  chrome.storage.local.get(["streak"], (res) => {
    if (res.streak) {
      chrome.storage.local.set({ streak: res.streak + 1 });
    } else {
      chrome.storage.local.set({ streak: 1 });
    }

    chrome.notifications.create({
      type: "basic",
      iconUrl: chrome.runtime.getURL("/assets/logo/icon-64.png"),
      title: "Finished a session!",
      message: `Now you can take a break!`,
    });
  });
}

chrome.storage.local.get(["timer", "isRunning", "selectedTime"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    selectedTime: "selectedTime" in res ? res.selectedTime : 25,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});
