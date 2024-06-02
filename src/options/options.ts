import browser from "webextension-polyfill";

import { options, focusSettings } from "./elements";

browser.storage.local.get(["options", "isRunning"]).then((data) => {
  if (data.options) {
    options.forEach((option) => {
      option.checked = data.options[option.id];
    });
  }

  hiddenFocusSettings(data.isRunning);
});

function hiddenFocusSettings(isRunning: boolean) {
  if (isRunning) {
    focusSettings.style.display = "none";
  } else {
    focusSettings.style.display = "block";
  }
}

options.forEach((option) => {
  option.addEventListener("change", () => {
    browser.storage.local.get("options").then((data) => {
      let options = data.options || {};
      options[option.id] = option.checked;
      browser.storage.local.set({ options });
    });
  });
});

browser.storage.onChanged.addListener((changes) => {
  if (changes.isRunning && changes.isRunning.newValue) {
    hiddenFocusSettings(true);
  }

  if (changes.isRunning && !changes.isRunning.newValue) {
    hiddenFocusSettings(false);
  }

  if (changes.options && changes.options.newValue) {
    options.forEach((option) => {
      option.checked = changes.options.newValue[option.id];
    });
  }
});
