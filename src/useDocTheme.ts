/*
 * Switch between light and dark theme
 * - Supports TailwindCSS
 * - Adds 'dark' class to <body>
 */
import useLocalStorage from "./useLocalStorage";

/**
 * Sets the theme to dark, light or system.
 * 
 * Read: https://github.com/gauravjot/use-doc-theme?tab=readme-ov-file#2-usedoctheme
 */
export default function useDocTheme(): {
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
			setTheme("dark");
		},
		light: () => {
			setTheme("light");
		},
		system: () => {
			setTheme("system");
		},
		toggle: () => {
			if (theme === "light") {
				// if it is light, switch to dark
				setTheme("dark");
			} else if (theme === "dark") {
				// if it is dark, switch to light
				setTheme("light");
			} else if (theme === "system") {
				// if it is system, we need to know what theme system has
				if (
					window.matchMedia &&
					window.matchMedia("(prefers-color-scheme: dark)").matches
				) {
					// system has dark theme
					setTheme("light");
				} else {
					// system has light theme
					setTheme("dark");
				}
			}
		},
	};
}
