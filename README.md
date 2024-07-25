<div align="center">
  <a href="https://www.npmjs.com/package/use-doc-theme">
    <img src="https://raw.githubusercontent.com/nzran/use-doc-theme/main/usedoctheme-logo.png" width="700" alt="use-debounce" />
  </a>
  <br/>
  <small>Hook to change website theme. Reactjs. Supports Tailwind.</small>
</div>
<br/>
<div align="center">
  <a href="https://www.npmjs.com/package/use-doc-theme">
    <img alt="npm" src="https://img.shields.io/npm/v/use-doc-theme.svg" />
  </a>
  <a href="https://npmjs.org/package/use-doc-theme">
    <img alt="downloads" src="https://badgen.net/npm/dm/use-doc-theme" />
  </a>
  <a href="https://npmjs.org/package/use-doc-theme">
    <img alt="types included" src="https://badgen.net/npm/types/use-doc-theme" />
  </a>
  <a href="https://npmjs.org/package/use-doc-theme">
    <img alt="license MIT" src="https://badgen.net/npm/license/use-doc-theme" />
  </a>
</div>

---

<div align="center">

![demo pure css](https://raw.githubusercontent.com/nzran/use-doc-theme/main/demo-pure-css.gif)

</div>

## Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [1. Setup ThemeProvider](#1-setup-themeprovider)
  - [2. useDocTheme](#2-usedoctheme)
    - [Available Options](#available-options)
  - [CSS Setup](#css-setup)
    - [Tailwind CSS](#tailwind-css)
    - [Regular CSS](#regular-css)
- [Utility &mdash; useLocalStorage](#utility--uselocalstorage)
- [Contribution](#contribution)


## Features

This library for Reactjs includes two hooks:

1. **useDocTheme**
    - Supports dark, light and system theme with body class of `dark`.
    - Supports Tailwind CSS.
    - By default apply system theme.
2. **useLocalStorage**
    - Supports saving and loading data from browser's local storage.

## Installation

```bash
npm install use-doc-theme --save
```

> `@latest` version supports **React 18.3.1**. Use `@0.2.0` for earlier React versions.

## Usage

See the demo, built with Reactjs and pure CSS: [https://codepen.io/gauravjot/full/yLQexGR](https://codepen.io/gauravjot/full/yLQexGR)

### 1. Setup ThemeProvider

In your _App.tsx_ or _layout.tsx_ file, wrap your app with `ThemeProvider`.

```javascript
import { ThemeProvider } from "use-doc-theme";

export default function App() {

  return (
    <ThemeProvider>
      {...your other components}
    </ThemeProvider>
  );
}
```

This will detect the user's selected theme or theme set by system.

### 2. useDocTheme

Intializing the hook to access various theme controls.

```javascript
/* import */
import { useDocTheme } from "use-doc-theme";

function App() {
  /* initialize */
  const theme = useDocTheme();

  return (
    <>
      {/* usage */}
      <button onClick={theme.toggle}>Toggle</button>
    </>
  );
}
```

#### Available Options

These are all the available methods and options.

```javascript
const theme = useDocTheme();

// Apply Light
theme.light();

// Apply Dark
theme.dark();

// Apply System
theme.system();

// Toggle
theme.toggle();

// Check active theme

if (theme.isLightMode) {
 // Light Theme is active
}

if (theme.isDarkMode) {
 // Dark Theme is active
}

if (theme.isSystemMode) {
 // System Theme is active
}
```

### CSS Setup

#### Tailwind CSS

Add this to your `tailwind.config.js` file.

```javascript
module.exports = {
  darkMode: 'class',
  // ...
}
```

Learn more here: [Dark Mode - Tailwind CSS](https://tailwindcss.com/docs/dark-mode).

#### Regular CSS

Use `.dark` class. For example:

```css
.hello {
  background: white;
  color: black;
}

.dark .hello {
  /* dark theme */
  background: black;
  color: white;
}
```

For `body` tag, use

```css
body.dark {
  /* dark theme */
  background: black;
  color: white;
}
```

## Utility &mdash; `useLocalStorage`

It behaves identical to `useState` with a plus that the state is saved in local storage and therefore persist over sessions.

You need to provide a unique key and a default value if the value is not available in local storage.

```javascript
import { useLocalStorage } from "use-doc-theme";

function App() {

  const [book, setBook] = useLocalStorage<string>(
    "book", /* key */
    "The Alchemist by Paulo Coelho" /* default value */
  );

  return (
    <>
      <button
        onClick={() => {
          setBook("Happy Place by Emily Henry");
        }}
      >
        Switch Book
      </button>

      <h1>Current book</h1>
      <p>{book}</p>
    </>
  );
}
```

> Data saved into local storage gets JSON stringified so you may also save objects.

## Contribution

Community contributions are welcomed.
