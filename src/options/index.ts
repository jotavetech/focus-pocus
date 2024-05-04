let options = document.querySelectorAll(
  'input[type="checkbox"]'
) as NodeListOf<HTMLInputElement>;

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
