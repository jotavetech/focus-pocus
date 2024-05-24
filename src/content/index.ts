import browser from "webextension-polyfill";

let urlLinks: string[] = [];
let isRunning = false

browser.storage.local.get(["blockList", "isRunning"]).then((res) => {
  urlLinks = res.blockList || [];
  isRunning = res.isRunning ?? false

  main()
});

browser.storage.onChanged.addListener((changes) => {
  if (changes.blockList) {
    urlLinks = changes.blockList.newValue;
    main()
  }

  if (changes.isRunning) {
    isRunning = changes.isRunning.newValue
    main();
  }
});

function getFocusPage() {
  return document.querySelector("#focus-page")
}

function hasFocusPage() {
  return !!getFocusPage()
}

function removeFocusPage() {
  getFocusPage()?.remove()
}

function addFocusPage() {
  const focusPage = document.createElement("div");
  focusPage.id = "focus-page";
  focusPage.innerHTML = `
    <div id="focus-page-content">
      <h1>Focus Mode</h1>
      <p>Time to focus on your work.</p>
      <p>If you give up, your streak will be reset.</p>
    </div>
    `;

  if(hasFocusPage()){
    getFocusPage()?.replaceWith(focusPage)
  }else {
    document.body.appendChild(focusPage);
  }

  document.querySelectorAll("video").forEach((video) => {
    video.pause();
  });

  document.querySelectorAll("audio").forEach((audio) => {
    audio.pause();
  });
}


function main() {
  const shouldBlockPage = isRunning && urlLinks.some(url => window.location.href.includes(url))

  if(shouldBlockPage){
    addFocusPage()
  }

  if(!shouldBlockPage && hasFocusPage()){
    removeFocusPage()
  }
}