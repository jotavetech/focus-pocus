# FocusPocus

[Demo Video](https://www.youtube.com/watch?v=4UI_6rQ95HU)

<div>
    <img src="https://img.shields.io/github/languages/top/jotavetech/focus-pocus" alt="Most used language" />
    <img src="https://img.shields.io/github/last-commit/jotavetech/focus-pocus" alt="Last commit" />
    <img src="https://img.shields.io/badge/browser-extension-8A2BE2" alt="Browser extension" />
</div>

> FocusPocus is a browser extension created to help you maintain focus on your studies by blocking access to pages that may distract you during focus mode.

![FocusPocus icon (a clock) with the text 'FocusPocus' and below a slogan 'Stay focused as if under a magical spell'](https://i.imgur.com/pn5aZcT.png)

### Features

1. Focus Mode: Activate focus mode to block access to distracting websites while studying.
2. Custom Blocking: FocusPocus allows you to choose which sites to block during focus mode.
3. Scheduling: You can set the duration of your focus mode timer.
4. Streak: You earn a point every time the timer finishes, but if you give up halfway through, you lose everything.

### Todo

- [x] Add custom timer settings.
- [ ] Add allowed list mode.
- [ ] Add groups for the blocked websites list.
- [ ] Add a verification prompt before giving up.
- [x] Add support for other browsers.
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

# chrome:
yarn dev:chrome #compile to /dest/chrome folder

# firefox:
yarn dev:firefox #compile to /dest/firefox folder
```

_with npm:_

```bash
git clone https://github.com/jotavetech/focus-pocus.git
cd focus-pocus

npm install #install the dependencies

# chrome:
npm run dev:chrome #compile to /dest/chrome folder

#firefox:
npm run dev:firefox #compile to /dest/firefox folder
```

### How to contribute

1. Fork this repository.
2. Clone your fork on your machine.
3. Make your changes, commit and push these.
4. Open a pull request (Write a descriptive message about what you've changed).

### Contributors

A big thank you to everyone who contributed to FocusPocus

<a href="https://github.com/jotavetech" target="_blank"><img src="https://avatars.githubusercontent.com/u/92704272?v=4" alt="jotavetech picture" style="width: 80px" /></a>
<a href="https://github.com/Ryrden" target="_blank"><img src="https://avatars.githubusercontent.com/u/76923948?v=4" alt="ryrden picture" style="width: 80px" /></a>

Thank you ❤️
