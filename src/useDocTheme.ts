/*
 * Switch between light and dark theme
 * - Supports TailwindCSS
 * - Adds 'dark' class to <body>
 */
import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

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
	const [isIntialLoad, setIsInitialLoad] = useState(true);

	// DOM inserts
	function changeToDark() {
		document.body.classList.add("dark");
		if (isIntialLoad) setIsInitialLoad(false);
	}
	function changeToLight() {
		document.body.classList.remove("dark");
		if (isIntialLoad) setIsInitialLoad(false);
	}

	// Set default color accoriding to browser's theme
	if (autoapply && isIntialLoad) {
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			if (theme === "dark" || theme === "system") {
				changeToDark();
			} else if (theme === "light") {
				changeToLight();
			}
		} else {
			if (theme === "light" || theme === "system") {
				changeToLight();
			} else if (theme === "dark") {
				changeToDark();
			}
		}

		// Detect browser's theme change
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", (event) => {
				if (theme === null) {
					if (event.matches) {
						changeToDark();
					} else {
						changeToLight();
					}
				}
			});
	}

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
