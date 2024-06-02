import browser from "webextension-polyfill";

let blocklist: string[] = [];
let allowlist: string[] = [];

let allowlistMode = false;

function initialize() {
  browser.storage.local
    .get(["blocklist", "allowlist", "isRunning", "options"])
    .then((res) => {
      blocklist = res.blocklist || [];
      allowlist = res.allowlist || [];

      if (res.options && res.options["allowlist-mode"]) {
        allowlistMode = true;
      }

      if (res.isRunning) {
        checkFocusPage();
      }
    });
}

browser.storage.onChanged.addListener((changes) => {
  if (changes.blocklist) blocklist = changes.blocklist.newValue || [];
  if (changes.allowlist) allowlist = changes.allowlist.newValue || [];

  if (changes.options) {
    if (
      changes.options.newValue &&
      changes.options.newValue["allowlist-mode"]
    ) {
      allowlistMode = true;
    } else {
      allowlistMode = false;
    }
  }

  if (changes.isRunning) {
    if (changes.isRunning.newValue) {
      checkFocusPage();
    } else {
      removeFocusPage();
    }
  }
});

function checkFocusPage() {
  removeFocusPage();
  checkMode();
}

function checkMode() {
  if (allowlistMode) {
    for (let url of allowlist) {
      if (window.location.href.includes(url)) return;
    }
    addFocusPage();
  } else {
    for (let url of blocklist) {
      if (window.location.href.includes(url)) {
        addFocusPage();
        return;
      }
    }
  }
}

function addFocusPage() {
  const body = document.querySelector("body");
  const focusPage = document.createElement("div");
  focusPage.id = "focus-page";
  focusPage.innerHTML = `
    <div id="focus-page-content">
      <h1>Focus Mode</h1>
      <p>Time to focus on your work.</p>
      <p>If you give up, your streak will be reset.</p>
    </div>
  `;

  if (body) body.appendChild(focusPage);
}

function removeFocusPage() {
  const focusPage = document.querySelector("#focus-page");
  if (focusPage) focusPage.remove();
}

initialize();
