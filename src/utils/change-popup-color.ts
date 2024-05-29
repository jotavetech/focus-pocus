function changePopupColor(isStarted: boolean) {
  if (isStarted) {
    document.documentElement.style.setProperty("--text", "#fff");
    document.documentElement.style.setProperty("--header-bg", "#9f0017");
    document.documentElement.style.setProperty("--action-bg", "#fff");
    document.documentElement.style.setProperty("--action-text", "#9f0017");
    document.documentElement.style.setProperty("--bg", "#b51026");
  } else {
    document.documentElement.style.setProperty("--text", "#fff");
    document.documentElement.style.setProperty("--header-bg", "#0b0b0b");
    document.documentElement.style.setProperty("--action-bg", "#171717");
    document.documentElement.style.setProperty("--action-text", "#fff");
    document.documentElement.style.setProperty("--bg", "#0d0d0d");
  }
}

export default changePopupColor;
