/*
 * Switch between light and dark theme
 * - Supports TailwindCSS
 * - Adds 'dark' class to <body>
 */
import useLocalStorage from "./useLocalStorage";

// DOM inserts
function changeToDark() {
	document.body.classList.add("dark");
}
function changeToLight() {
	document.body.classList.remove("dark");
}

/**
 * Sets the theme to dark, light or system.
 * @param autoapply apply the theme automatically on using this hook.
 */
export default function useDocTheme(autoapply = true): {
	isDarkMode: boolean;
	isLightMode: boolean;
	isSystemMode: boolean;
	dark: () => void;
	light: () => void;
	system: () => void;
	toggle: () => void;
} {
	const [theme, setTheme] = useLocalStorage<string>("nzran-theme", "system");

	return {
		isDarkMode: theme === "dark",
		isSystemMode: theme === "system",
		isLightMode: theme === "light",
		dark: () => {
			changeToDark();
			setTheme("dark");
		},
		light: () => {
			changeToLight();
			setTheme("light");
		},
		system: () => {
			if (
				window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches
			) {
				changeToDark();
			} else {
				changeToLight();
			}
			setTheme("system");
		},
		toggle: () => {
			if (theme === "light") {
				// if it is light, switch to dark
				changeToDark();
				setTheme("dark");
			} else if (theme === "dark") {
				// if it is dark, switch to light
				changeToLight();
				setTheme("light");
			} else if (theme === "system") {
				// if it is system, we need to know what theme system has
				if (
					window.matchMedia &&
					window.matchMedia("(prefers-color-scheme: dark)").matches
				) {
					// system has dark theme
					changeToLight();
					setTheme("light");
				} else {
					// system has light theme
					changeToDark();
					setTheme("dark");
				}
			}
		},
	};
}
