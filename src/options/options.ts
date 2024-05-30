import browser from "webextension-polyfill";

import { options } from "./elements";

browser.storage.local.get("options").then((data) => {
  if (data.options) {
    options.forEach((option) => {
      option.checked = data.options[option.id];
    });
  }
});

options.forEach((option) => {
  option.addEventListener("change", () => {
    browser.storage.local.get("options").then((data) => {
      let options = data.options || {};
      options[option.id] = option.checked;
      browser.storage.local.set({ options });
    });
  });
});
