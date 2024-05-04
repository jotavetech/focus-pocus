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
    playGiveUpSound();
  }

  if (soundType === "finished") {
    playFinishedSound();
  }

  playButtonPressSound();
}

export default playSound;
