let urlLinks: string[] = [];

let tabStates: Map<string, boolean> = new Map();

chrome.storage.local.get(["blockList"], (res) => {
  console.log("blocklist", res.blockList);
  urlLinks = res.blockList || [];
});

chrome.storage.local.get(["isRunning"], (res) => {
  if (res.isRunning) {
    addFocusPage();
  }
});

chrome.storage.onChanged.addListener((changes) => {
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
