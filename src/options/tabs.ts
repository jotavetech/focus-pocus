import { tabs, pages } from "./elements";

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => tab.classList.remove("active-tab"));
    tab.classList.add("active-tab");

    checkHiddenPagesAndShowCurrent(tab.id);
  });
});

function checkHiddenPagesAndShowCurrent(tabId: string) {
  pages.forEach((page) => page.classList.add("hidden-page"));

  pages.forEach((page) => {
    if (page.id === "main-page" && tabId === "tab-main")
      page.classList.remove("hidden-page");
    if (page.id === "blocklist-page" && tabId === "tab-blocklist")
      page.classList.remove("hidden-page");
    if (page.id === "allowlist-page" && tabId === "tab-allowlist")
      page.classList.remove("hidden-page");
  });
}
