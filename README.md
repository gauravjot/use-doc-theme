<div align="center">
  <a href="https://www.npmjs.com/package/use-doc-theme">
    <img src="https://raw.githubusercontent.com/nzran/use-doc-theme/main/usedoctheme-logo.png" width="700" alt="use-debounce" />
  </a>
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

## Features

This library for Reactjs includes two hooks:

1. **useDocTheme**
    - Supports dark, light and system theme with body class of `dark`.
    - Supports Tailwind.
    - By default apply system theme.
2. **useLocalStorage**
    - Supports saving and loading data from browser's local storage.

## Installation

```bash
npm install use-doc-theme --save
```

## Usage

### 1. useDocTheme

This is the simplest implementation of the hook.

```javascript
import { useDocTheme } from "use-doc-theme";

function App() {
 const theme = useDocTheme();

 return (
  <>
   <button onClick={theme.toggle}>Toggle</button>
  </>
 );
}
```

#### Default Behavior

Using the hook will by default apply system theme.

#### Available Options

These are all the available methods and options.

```javascript
const theme = useDocTheme();

// Switch to Light Mode
theme.light();

// Switch to Dark Mode
theme.dark();

// Apply System Theme
theme.system();

// Toggle between dark and light
theme.toggle();

/*
 * Check active theme
 * - isDarkMode
 * - isLightMode
 * - isSystemMode
 */
if (theme.isDarkMode) {
 // Dark Theme is active
}
```

### 2. useLocalStorage

The `useLocalStorage` hook takes **two string parameters**. The first parameter is the name of **key** in local storage and the second is the **default value** in case local storage does not already have value for the key.

```javascript
import { useLocalStorage } from "use-doc-theme";

function App() {
 const [book, setBook] = useLocalStorage("book", "The Alchemist by Paulo Coelho");

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

## Tailwind Support

Add this to your `tailwind.config.js` file.

```javascript
module.exports = {
  darkMode: 'class',
  // ...
}
```

## Contribution

Community contributions are welcomed.
