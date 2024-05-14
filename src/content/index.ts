import browser from "webextension-polyfill";

let urlLinks: string[] = [];

let tabStates: Map<string, boolean> = new Map();

browser.storage.local.get(["blockList", "isRunning"]).then((res) => {
  urlLinks = res.blockList || [];

  if (res.isRunning) {
    addFocusPage();
  }
});

browser.storage.onChanged.addListener((changes) => {
  if (changes.blockList) {
    urlLinks = changes.blockList.newValue;
  }

  if (changes.isRunning && changes.isRunning.newValue) {
    addFocusPage();
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

function addFocusPage() {
  const currentTabId = getCurrentTabId()!;
  if (!tabStates.get(currentTabId)) {
    for (let url of urlLinks) {
      if (window.location.href.includes(url)) {
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

        tabStates.set(currentTabId, true);
        return;
      }
    }
  }
}

function getCurrentTabId() {
  return new URLSearchParams(window.location.search).get("tabId");
}
