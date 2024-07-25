import useLocalStorage from "./useLocalStorage";
import * as React from "react";

// DOM inserts
const changeToDark = () => {
    document.body.classList.add("dark");
}
const changeToLight = () => {
    document.body.classList.remove("dark");
}

export const ThemeProvider = (props: {children: React.ReactNode}): React.ReactElement => {
	const [theme] = useLocalStorage<string>("nzran-theme", "system");

    if (!window || !document) {
        console.error("Library use-doc-theme can only be used in client-side applications.");
        return <>{props.children}</>;
    }

    if (window.matchMedia) {
        const darkSystemTheme = window.matchMedia("(prefers-color-scheme: dark)");

        // Apply appropriate theme
        if (darkSystemTheme.matches) {
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
        darkSystemTheme.addEventListener("change", (event) => {
            if (theme === null) {
                if (event.matches) {
                    changeToDark();
                } else {
                    changeToLight();
                }
            }
        });
    }

	return <>{props.children}</>;
};