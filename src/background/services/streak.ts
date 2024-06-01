import browser from "webextension-polyfill";

function pushFinishedSessionNotification() {
  browser.notifications.create({
    type: "basic",
    iconUrl: browser.runtime.getURL("/assets/logo/icon-64.png"),
    title: "Finished a session!",
    message: `Now you can take a break!`,
  });
}

async function getStreakAndIncrement() {
  browser.storage.local.get(["streak"]).then((res) => {
    const streak = res.streak || 0;
    browser.storage.local.set({ streak: streak + 1 });
    browser.action.setIcon({ path: "assets/logo/icon-32.png" });

    browser.storage.local.get(["options"]).then((res) => {
      if (res.options["victorious-notification"])
        pushFinishedSessionNotification();
    });
  });
}

function resetStreak() {
  browser.storage.local.set({ streak: 0 });
}

export { getStreakAndIncrement, resetStreak };
