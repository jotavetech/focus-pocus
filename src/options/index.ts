let options = document.querySelectorAll(
  'input[type="checkbox"]'
) as NodeListOf<HTMLInputElement>;

let urlForm = document.querySelector("#block-list-form") as HTMLFormElement;
let urlInput = document.querySelector("#url-input") as HTMLInputElement;
let sendButton = document.querySelector("#send-button") as HTMLButtonElement;
const removeAllButton = document.querySelector(
  "#remove-all-button"
) as HTMLButtonElement;

let timerIsRunning = false;

// sound options

chrome.storage.local.get("isRunning", (data) => {
  if (data.isRunning) {
    urlInput.disabled = true;
    sendButton.disabled = true;
    timerIsRunning = true;
  }
});

chrome.storage.onChanged.addListener((changes) => {
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

chrome.storage.local.get("options", (data) => {
  if (data.options) {
    options.forEach((option) => {
      option.checked = data.options[option.id];
    });
  }
});

options.forEach((option) => {
  option.addEventListener("change", () => {
    chrome.storage.local.get("options", (data) => {
      let options = data.options || {};
      options[option.id] = option.checked;
      chrome.storage.local.set({ options });
    });
  });
});

// block list

let blockList: string[] = [];

chrome.storage.local.get("blockList", (data) => {
  blockList = data.blockList || [];
  blockList.forEach((url) => {
    addUrlListElement(url);
  });
});

urlForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!urlInput.value) {
    alert("Please enter a URL.");
    return;
  }
  chrome.storage.local.get("blockList", (data) => {
    blockList.push(urlInput.value);
    chrome.storage.local.set({ blockList });
    addUrlListElement(urlInput.value);
    urlInput.value = "";
  });
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
  if (timerIsRunning) {
    alert("You can't remove a website while the focus mode is running.");
  } else {
    blockList = blockList.filter((u) => u !== url);
    chrome.storage.local.set({ blockList });

    let ul = document.querySelector(".website-list") as HTMLUListElement;
    ul.innerHTML = "";

    blockList.forEach((url) => {
      addUrlListElement(url);
    });
  }
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
  if (timerIsRunning) {
    alert("You can't remove a website while the focus mode is running.");
  } else {
    blockList = [];
    chrome.storage.local.set({ blockList });

    let ul = document.querySelector(".website-list") as HTMLUListElement;
    ul.innerHTML = "";
  }
});
