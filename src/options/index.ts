import browser from 'webextension-polyfill';

const options = document.querySelectorAll(
  'input[type="checkbox"]'
) as NodeListOf<HTMLInputElement>;

const urlForm = document.querySelector("#block-list-form") as HTMLFormElement;
const urlInput = document.querySelector("#url-input") as HTMLInputElement;
const sendButton = document.querySelector("#send-button") as HTMLButtonElement;
const removeAllButton = document.querySelector(
  "#remove-all-button"
) as HTMLButtonElement;

let timerIsRunning = false;
let blockList: string[] = [];

// sound options

browser.storage.local.get(["isRunning", "options", "blockList"]).then((data) => {
  if (data.isRunning) {
    urlInput.disabled = true;
    sendButton.disabled = true;
    timerIsRunning = true;
  }

  if (data.options) {
    options.forEach((option) => {
      option.checked = data.options[option.id];
    });
  }

  if (data.blockList) {
    blockList = data.blockList;
    blockList.forEach((url) => {
      addUrlListElement(url);
    });
  }
});

browser.storage.onChanged.addListener((changes) => {
  if (changes.isRunning && changes.isRunning.newValue) {
    urlInput.disabled = true;
    sendButton.disabled = true;
    timerIsRunning = true;
  }

  if (changes.isRunning && !changes.isRunning.newValue) {
    urlInput.disabled = false;
    sendButton.disabled = false;
    timerIsRunning = false;
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

urlForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (timerIsRunning)
    return alert("You can't add a website while the focus mode is running.");
  if (!urlInput.value) return alert("Please enter a URL.");

  blockList.push(urlInput.value);
  browser.storage.local.set({ blockList });
  addUrlListElement(urlInput.value);
  urlInput.value = "";
});

function createUrlListElement(url: string) {
  let li = document.createElement("li");

  li.innerHTML = `
    <span>${url}</span>
    <button class="remove-button">
      <img src="../assets/img/trash-2.svg" alt="trash icon" />
    </button>
  `;

  return li;
}

function addUrlListElement(url: string) {
  let ul = document.querySelector(".website-list") as HTMLUListElement;
  ul.appendChild(createUrlListElement(url));
}

function removeUrlListElement(url: string) {
  if (timerIsRunning)
    return alert("You can't remove a website while the focus mode is running.");

  blockList = blockList.filter((u) => u !== url);
  browser.storage.local.set({ blockList });

  let ul = document.querySelector(".website-list") as HTMLUListElement;
  ul.innerHTML = "";

  blockList.forEach((url) => {
    addUrlListElement(url);
  });
}

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (
    target.classList.contains("remove-button") ||
    target.parentElement?.classList.contains("remove-button")
  ) {
    let url =
      target.parentElement?.parentElement?.querySelector("span")?.textContent;
    if (url) {
      removeUrlListElement(url);
    }
  }
});

removeAllButton.addEventListener("click", () => {
  if (timerIsRunning)
    return alert("You can't remove a website while the focus mode is running.");

  blockList = [];
  browser.storage.local.set({ blockList });

  let ul = document.querySelector(".website-list") as HTMLUListElement;
  ul.innerHTML = "";
});
