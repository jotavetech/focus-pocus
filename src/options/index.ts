import {
  blocklistForm,
  allowlistForm,
  blocklistButton,
  blocklistInput,
  blocklistList,
  allowlistButton,
  allowlistInput,
  allowlistList,
  streakCounter,
} from "./elements";

import "./tabs";
import "./options";

import browser from "webextension-polyfill";

let blocklist: string[] = [];
let allowlist: string[] = [];

let isRunning = false;

function disableListsWhileRunning() {
  blocklistButton.disabled = true;
  allowlistButton.disabled = true;
  blocklistInput.disabled = true;
  allowlistInput.disabled = true;
}

function enableListsWhileNotRunning() {
  blocklistButton.disabled = false;
  allowlistButton.disabled = false;
  blocklistInput.disabled = false;
  allowlistInput.disabled = false;
}

browser.storage.local
  .get(["blocklist", "allowlist", "isRunning", "options", "streak"])
  .then((data) => {
    if (data.isRunning) {
      isRunning = true;
      disableListsWhileRunning();
    }

    if (data.blocklist) {
      blocklist = data.blocklist;
      blocklist.forEach((url) => {
        addUrlListElement(url, blocklistList, "blocklist");
      });
    }

    if (data.allowlist) {
      allowlist = data.allowlist;
      allowlist.forEach((url) => {
        addUrlListElement(url, allowlistList, "allowlist");
      });
    }

    if (data.streak) {
      streakCounter.textContent = data.streak.toString();
    }
  });

browser.storage.onChanged.addListener((changes) => {
  if (changes.isRunning && changes.isRunning.newValue) {
    isRunning = true;
    disableListsWhileRunning();
  }

  if (changes.isRunning && !changes.isRunning.newValue) {
    isRunning = false;
    enableListsWhileNotRunning();
  }

  if (changes.streak && changes.streak.newValue) {
    streakCounter.textContent = changes.streak.newValue.toString();
  }
});

blocklistForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isRunning) {
    return alert("You can't add a website while the focus mode is running.");
  }
  if (!blocklistInput.value) {
    return alert("Please enter a URL.");
  }

  blocklist.push(blocklistInput.value);

  browser.storage.local.set({ blocklist });

  addUrlListElement(blocklistInput.value, blocklistList, "blocklist");

  blocklistInput.value = "";
});

allowlistForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isRunning) {
    return alert("You can't add a website while the focus mode is running.");
  }
  if (!allowlistInput.value) {
    return alert("Please enter a URL.");
  }

  allowlist.push(allowlistInput.value);

  browser.storage.local.set({ allowlist });

  addUrlListElement(allowlistInput.value, allowlistList, "allowlist");

  allowlistInput.value = "";
});

function createUrlListElement(url: string, type: "blocklist" | "allowlist") {
  const li = document.createElement("li");

  li.innerHTML = `
    <span>${url}</span>
    <button class="remove-button-${type}">
      <img src="../assets/img/remove.svg" alt="remove icon" />
    </button>
  `;

  return li;
}

function addUrlListElement(
  url: string,
  list: HTMLUListElement,
  type: "blocklist" | "allowlist"
) {
  const li = createUrlListElement(url, type);
  list.appendChild(li);
}

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (
    target.classList.contains("remove-button-blocklist") ||
    target.parentElement?.classList.contains("remove-button-blocklist")
  ) {
    let url =
      target.parentElement?.parentElement?.querySelector("span")?.textContent;
    if (url) {
      removeBlocklistElement(url);
    }
  }

  if (
    target.classList.contains("remove-button-allowlist") ||
    target.parentElement?.classList.contains("remove-button-allowlist")
  ) {
    let url =
      target.parentElement?.parentElement?.querySelector("span")?.textContent;
    if (url) {
      removeAllowlistElement(url);
    }
  }
});

function removeBlocklistElement(url: string) {
  if (isRunning)
    return alert("You can't remove a website while the focus mode is running.");
  blocklist = blocklist.filter((u) => u !== url);
  browser.storage.local.set({ blocklist });

  blocklistList.innerHTML = "";

  blocklist.forEach((url) => {
    addUrlListElement(url, blocklistList, "blocklist");
  });
}

function removeAllowlistElement(url: string) {
  if (isRunning)
    return alert("You can't remove a website while the focus mode is running.");
  allowlist = allowlist.filter((u) => u !== url);
  browser.storage.local.set({ allowlist });

  allowlistList.innerHTML = "";

  allowlist.forEach((url) => {
    addUrlListElement(url, allowlistList, "allowlist");
  });
}
