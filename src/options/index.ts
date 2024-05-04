let options = document.querySelectorAll(
  'input[type="checkbox"]'
) as NodeListOf<HTMLInputElement>;

let urlForm = document.querySelector("#block-list-form") as HTMLFormElement;
let urlInput = document.querySelector("#url-input") as HTMLInputElement;

// sound options

chrome.storage.sync.get("options", (data) => {
  if (data.options) {
    options.forEach((option) => {
      option.checked = data.options[option.id];
    });
  }
});

options.forEach((option) => {
  option.addEventListener("change", () => {
    chrome.storage.sync.get("options", (data) => {
      let options = data.options || {};
      options[option.id] = option.checked;
      chrome.storage.sync.set({ options });
    });
  });
});

let blockList: string[] = [];

chrome.storage.sync.get("blockList", (data) => {
  blockList = data.blockList || [];
  blockList.forEach((url) => {
    addUrlListElement(url);
  });
});

urlForm.addEventListener("submit", (e) => {
  e.preventDefault();
  chrome.storage.sync.get("blockList", (data) => {
    blockList.push(urlInput.value);
    chrome.storage.sync.set({ blockList });
    addUrlListElement(urlInput.value);
    urlInput.value = "";
  });
});

function createUrlListElement(url: string) {
  let li = document.createElement("li");

  li.innerHTML = `
    <span>${url}</span>
    <button class="remove-button">
      <img src="../assets/trash-2.svg" alt="trash icon" />
    </button>
  `;

  return li;
}

function addUrlListElement(url: string) {
  let ul = document.querySelector(".website-list") as HTMLUListElement;
  ul.appendChild(createUrlListElement(url));
}

function removeUrlListElement(url: string) {
  blockList = blockList.filter((u) => u !== url);
  chrome.storage.sync.set({ blockList });

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
