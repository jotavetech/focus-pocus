function playFinishedSound() {
  let finishedSound = new Audio("/assets/sounds/finished.mp3");
  finishedSound.play();
}

function playButtonPressSound() {
  let pressSound = new Audio("/assets/sounds/press.mp3");
  pressSound.play();
}

function playGiveUpSound() {
  let giveUpSound = new Audio("/assets/sounds/lose.wav");
  giveUpSound.play();
}

function playSound(soundType: "giveup" | "finished" | "button") {
  if (soundType === "giveup") {
    chrome.storage.local.get("options", (data) => {
      if (data.options && data.options["give-up-sound"]) {
        playGiveUpSound();
      }
    });
    return;
  }

  if (soundType === "finished") {
    chrome.storage.local.get("options", (data) => {
      if (data.options && data.options["victorious-sound"]) {
        playFinishedSound();
      }
    });
    return;
  }

  chrome.storage.local.get("options", (data) => {
    if (data.options && data.options["button-sound"]) {
      playButtonPressSound();
    }
  });
}

export default playSound;
