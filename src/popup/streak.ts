import browser from "webextension-polyfill";

import { streakCounter, streakButton } from "./elements";

streakButton.addEventListener("click", () => {
  browser.notifications.create({
    type: "basic",
    iconUrl: browser.runtime.getURL("/assets/logo/icon-64.png"),
    title: "Streak copied to clipboard!",
    message: `Share your streak with your friends! 🚀`,
  });

  if (streakCounter.textContent == "0") {
    navigator.clipboard.writeText(
      "I'm starting my streak on the FocusPocus extension now! 🚀\n\nTry it at Google Web Store or Firefox Store"
    );
  } else {
    navigator.clipboard.writeText(
      `My current streak on the FocusPocus extension is ${streakCounter.textContent}! 🎯 \n\nTry it at Google Web Store or Firefox Store\n`
    );
  }
});
