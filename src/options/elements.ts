const tabs = document.querySelectorAll(".tab") as NodeListOf<HTMLDivElement>;
const pages = document.querySelectorAll(".page") as NodeListOf<HTMLDivElement>;

const options = document.querySelectorAll(
  'input[type="checkbox"]'
) as NodeListOf<HTMLInputElement>;

const blocklistForm = document.querySelector(
  "#blocklist-form"
) as HTMLFormElement;
const blocklistButton = document.querySelector(
  "#blocklist-button"
) as HTMLButtonElement;
const blocklistInput = document.querySelector(
  "#blocklist-input"
) as HTMLInputElement;
let blocklistList = document.querySelector(
  "#blocklist-list"
) as HTMLUListElement;

const allowlistForm = document.querySelector(
  "#allowlist-form"
) as HTMLFormElement;
const allowlistButton = document.querySelector(
  "#allowlist-button"
) as HTMLButtonElement;
const allowlistInput = document.querySelector(
  "#allowlist-input"
) as HTMLInputElement;
let allowlistList = document.querySelector(
  "#allowlist-list"
) as HTMLUListElement;

export {
  options,
  tabs,
  pages,
  blocklistForm,
  allowlistForm,
  blocklistButton,
  blocklistInput,
  blocklistList,
  allowlistButton,
  allowlistInput,
  allowlistList,
};
