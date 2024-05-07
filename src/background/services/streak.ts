function pushFinishedSessionNotification() {
  chrome.notifications.create({
    type: "basic",
    iconUrl: chrome.runtime.getURL("/assets/logo/icon-64.png"),
    title: "Finished a session!",
    message: `Now you can take a break!`,
  });
}

async function getStreakAndIncrement() {
  chrome.storage.local.get(["streak"]).then((res) => {
    const streak = res.streak || 0;
    chrome.storage.local.set({ streak: streak + 1 });
    pushFinishedSessionNotification();
  });
}

function resetStreak() {
  chrome.storage.local.set({ streak: 0 });
}

export { getStreakAndIncrement, resetStreak };
