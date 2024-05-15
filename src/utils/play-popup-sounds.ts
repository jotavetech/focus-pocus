import browser from "webextension-polyfill";

function playFinishedSound() {
  let finishedSound = new Audio(
    browser.runtime.getURL("/assets/sounds/finished.mp3"),
  );
  finishedSound.load();
  finishedSound.play();
}

function playButtonPressSound() {
  let pressSound = new Audio(
    browser.runtime.getURL("/assets/sounds/press.mp3"),
  );
  pressSound.load();
  pressSound.play();
}

function playGiveUpSound() {
  let giveUpSound = new Audio(
    browser.runtime.getURL("/assets/sounds/lose.wav"),
  );
  giveUpSound.load();
  giveUpSound.play();
}

function playSound(soundType: "giveup" | "finished" | "button") {
  if (soundType === "giveup") {
    browser.storage.local.get("options").then((data) => {
      if (data.options && data.options["give-up-sound"]) {
        playGiveUpSound();
      }
    });
    return;
  }

  if (soundType === "finished") {
    browser.storage.local.get("options").then((data) => {
      if (data.options && data.options["victorious-sound"]) {
        playFinishedSound();
      }
    });
    return;
  }

  browser.storage.local.get("options").then((data) => {
    if (data.options && data.options["button-sound"]) {
      playButtonPressSound();
    }
  });
}

export default playSound;
