const configButton = document.querySelector("#config") as HTMLElement;
const selectTime = document.querySelector("#select-time") as HTMLSelectElement;
const timerDisplay = document.querySelector("#timer-counter") as HTMLElement;
const startButton = document.querySelector("#start") as HTMLElement;
const streakCounter = document.querySelector("#streak-counter") as HTMLElement;
const streakButton = document.querySelector("#streak-button") as HTMLDivElement;
const customInput = document.querySelector("#custom-input") as HTMLInputElement;
const focusMode = document.querySelector("#focus-mode") as HTMLButtonElement;

export {
  configButton,
  selectTime,
  timerDisplay,
  startButton,
  streakCounter,
  customInput,
  focusMode,
  streakButton,
};
