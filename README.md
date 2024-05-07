# FocusPocus

[Demo Video](https://www.youtube.com/watch?v=4UI_6rQ95HU)

<div>
    <img src="https://img.shields.io/github/languages/top/jotavetech/focus-pocus" alt="Most used language" />
    <img src="https://img.shields.io/github/last-commit/jotavetech/focus-pocus" alt="Last commit" />
    <img src="https://img.shields.io/badge/chrome-extension-8A2BE2" alt="Chrome extension" />
</div>

> FocusPocus is a Chrome extension created to help you maintain focus on your studies by blocking access to pages that may distract you during focus mode.

![FocusPocus icon (a clock) with the text 'FocusPocus' and below a slogan 'Stay focused as if under a magical spell'](https://i.imgur.com/pn5aZcT.png)

### Features

1. Focus Mode: Activate focus mode to block access to distracting websites while studying.
2. Custom Blocking: FocusPocus allows you to choose which sites to block during focus mode.
3. Scheduling: You can set the duration of your focus mode timer.
4. Streak: You earn a point every time the timer finishes, but if you give up halfway through, you lose everything.

### Todo

- [ ] Add custom timer settings.
- [ ] Add allowed list mode.
- [ ] Add groups for the blocked websites list.
- [ ] Add a verification prompt before giving up.
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

_with npm:_

```bash
git clone https://github.com/jotavetech/focus-pocus.git
cd focus-pocus

npm install #install the dependencies
npm run dev #run and compile to /dest folder
```

### How to contribute

1. Fork this repository.
2. Clone your fork on your machine.
3. Make your changes, commit and push these.
4. Open a pull request (Write a descriptive message about what you've changed).

Thank you ❤️
