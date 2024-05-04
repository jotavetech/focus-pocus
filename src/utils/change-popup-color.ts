function changePopupColor(isStarted: boolean) {
  if (isStarted) {
    document.documentElement.style.setProperty("--strong", "#020001");
    document.documentElement.style.setProperty("--semistrong", "#340016");
    document.documentElement.style.setProperty("--medium", "#9f102c");
    document.documentElement.style.setProperty("--normal", "#d43b2d");
  } else {
    document.documentElement.style.setProperty("--strong", "#27191c");
    document.documentElement.style.setProperty("--semistrong", "#2d3839");
    document.documentElement.style.setProperty("--medium", "#114d4d");
    document.documentElement.style.setProperty("--normal", "#6e9987");
  }
}

export default changePopupColor;
