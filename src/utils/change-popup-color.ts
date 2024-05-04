function changePopupColor(isStarted: boolean) {
  if (isStarted) {
    document.documentElement.style.setProperty("--strong", "#003e4f");
    document.documentElement.style.setProperty("--semistrong", "#33384e");
    document.documentElement.style.setProperty("--medium", "#66324c");
    document.documentElement.style.setProperty("--normal", "#992c4b");
  } else {
    document.documentElement.style.setProperty("--strong", "#0d192b");
    document.documentElement.style.setProperty("--semistrong", "#0c5149");
    document.documentElement.style.setProperty("--medium", "#0a8967");
    document.documentElement.style.setProperty("--normal", "#09c184");
  }
}

export default changePopupColor;
