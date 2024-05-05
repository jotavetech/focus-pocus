# FocusPocus

<div>
    <img src="https://img.shields.io/github/languages/top/jotavetech/focus-pocus" alt="Most used language" />
    <img src="https://img.shields.io/github/last-commit/jotavetech/focus-pocus" alt="Last commit" />
    <img src="https://img.shields.io/badge/chrome-extension-8A2BE2" alt="Chrome extension"
</div>

> FocusPocus is an chrome extension created to help you maintain focus on your studies by blocking access to pages that may distract you during focus mode.

![FocusPocus icon (a clock) with the text 'FocusPocus' and below a slogan 'Stay focused as if under a magical spell](https://i.imgur.com/pn5aZcT.png)

### Features

1. Focus Mode: Activate focus mode to block access to distracting websites while studying.

2. Custom Blocking: FocusPocus allows you to choose which sites you want to block during focus mode.

3. Scheduling: You can choose the duration of your focus mode timer.

4. Streak: You earn a point every time the timer finishes, but if you give up halfway through, you lose everything.

### Todo

- [ ] Add custom timer settings.
- [ ] Add groups for blocked websites list.
- [ ] Add verification if you really want to give up.
- [ ] Add support for other browsers.
- [ ] Add PT-BR language support.

### How to run locally

1. Clone this repository.
2. Install the dependencies.
3. Run the dev script.
4. Activate developer mode on your browser and add the _manifest_ inside the _/dest_ folder that will be generated.

_with yarn:_

```bash
git clone https://github.com/jotavetech/focus-pocus.git
cd focus-pocus

yarn #install the dependencies
yarn dev #run and compile to /dest folder
```

### How to contribute

1. Fork this repository.
2. Clone your fork on your machine.
3. Make your changes, commit and push these.
4. Open a pull request (Write a descriptive message about what you changed).

Thank you ❤️
