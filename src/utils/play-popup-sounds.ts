function playFinishedSound() {
  let finishedSound = new Audio("/assets/finished.mp3");
  finishedSound.play();
}

function playButtonPressSound() {
  let pressSound = new Audio("/assets/press.mp3");
  pressSound.play();
}

function playGiveUpSound() {
  let giveUpSound = new Audio("/assets/lose.wav");
  giveUpSound.play();
}

function playSound(soundType: "giveup" | "finished" | "button") {
  if (soundType === "giveup") {
    chrome.storage.sync.get("options", (data) => {
      if (data.options && data.options["give-up-sound"]) {
        playGiveUpSound();
      }
    });
    return;
  }

  if (soundType === "finished") {
    chrome.storage.sync.get("options", (data) => {
      if (data.options && data.options["victorious-sound"]) {
        playFinishedSound();
      }
    });
    return;
  }

  chrome.storage.sync.get("options", (data) => {
    if (data.options && data.options["button-sound"]) {
      playButtonPressSound();
    }
  });
}

export default playSound;
