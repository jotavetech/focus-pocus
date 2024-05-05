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
          incrementStreak();
        }

        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

function getStreakFromStorage() {
  let streak = 0;

  chrome.storage.local.get(["streak"], (res) => {
    if (res.streak) streak = res.streak;
  });

  return streak;
}

function pushFinishedSessionNotification() {
  chrome.notifications.create({
    type: "basic",
    iconUrl: chrome.runtime.getURL("/assets/logo/icon-64.png"),
    title: "Finished a session!",
    message: `Now you can take a break!`,
  });
}

function incrementStreak() {
  let streak = getStreakFromStorage();
  chrome.storage.local.set({ streak: streak + 1 });
  pushFinishedSessionNotification();
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

export { getStreakFromStorage, incrementStreak, resetStreak };
