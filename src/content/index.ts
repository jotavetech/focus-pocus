import browser, { urlbar } from "webextension-polyfill";

let blocklist: string[] = [];
let allowlist: string[] = [];

let allowlistMode = false;

let tabStates: Map<string, boolean> = new Map();

browser.storage.local
  .get(["blocklist", "allowlist", "isRunning", "options"])
  .then((res) => {
    blocklist = res.blocklist;
    allowlist = res.allowlist;

    if (res.options["allowlist-mode"]) {
      allowlistMode = true;
    }

    if (res.isRunning) {
      checkFocusPage();
    }
  });

browser.storage.onChanged.addListener((changes) => {
  if (changes.blocklist) {
    blocklist = changes.blocklist.newValue;
  }

  if (changes.allowlist) {
    allowlist = changes.allowlist.newValue;
  }

  if (changes.isRunning && changes.isRunning.newValue) {
    checkFocusPage();
  }

  if (changes.options && changes.options.newValue["allowlist-mode"]) {
    allowlistMode = true;
  } else {
    allowlistMode = false;
  }

  if (changes.isRunning && !changes.isRunning.newValue) {
    const focusPage = document.querySelector("#focus-page");
    if (focusPage) {
      focusPage.remove();
      const tabId = getCurrentTabId()!;
      tabStates.delete(tabId);
    }
  }
});

browser.runtime.onMessage.addListener((message) => {
  if (message.type === "TIMER_FINISHED") {
    const focusPage = document.querySelector("#focus-page");
    if (focusPage) {
      focusPage.remove();
      const tabId = getCurrentTabId()!;
      tabStates.delete(tabId);
    }
  }
});

function checkFocusPage() {
  const currentTabId = getCurrentTabId()!;
  if (!tabStates.get(currentTabId)) {
    if (allowlistMode) {
      for (let url of allowlist) {
        if (window.location.href.includes(url)) {
          return;
        }

        addFocusPage(currentTabId);
      }
    }

    if (!allowlistMode) {
      for (let url of blocklist) {
        if (window.location.href.includes(url)) {
          addFocusPage(currentTabId);
        }
      }
    }
  }
}

function addFocusPage(currentTabId: string) {
  let focusPage = document.createElement("div");
  focusPage.id = "focus-page";
  focusPage.innerHTML = `
          <div id="focus-page-content">
            <h1>Focus Mode</h1>
            <p>Time to focus on your work.</p>
            <p>If you give up, your streak will be reset.</p>
          </div>
          `;
  document.querySelector("body")!.appendChild(focusPage);

  document.querySelectorAll("video").forEach((video) => {
    video.pause();
  });
  document.querySelectorAll("audio").forEach((audio) => {
    audio.pause();
  });

  tabStates.set(currentTabId, true);
  return;
}

function getCurrentTabId() {
  return new URLSearchParams(window.location.search).get("tabId");
}
