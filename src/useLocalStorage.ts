/*
 * Usage: const [theme, setTheme] = useLocalStorage("theme", "light");
 */

import { useEffect, useState } from "react";

/**
 * Get and save data with local storage.
 * @param key used to select the key in local storage
 * @param initialValue if no value is represent then return this value without saving it.
 * @returns `[value, setValue]`
 */
export default function useLocalStorage<T>(key: string, initialValue: T) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState<T>(initialValue);

	const initialize = () => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			if (item) {
				// This is for older versions of this library that
				// have localstorage data saved as string instead of JSON
				try {
					return JSON.parse(item) as T;
				} catch(e) {
					console.error(e);
					return item as T;
				}
			}
			return initialValue;
		} catch (error) {
			// If error also return initialValue
			console.log(error);
			return initialValue;
		}
	};

	/* prevents hydration error so that state is only initialized after server is defined */
	useEffect(() => {
		setStoredValue(initialize());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value: T | ((val: T) => T)) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue || initialValue) : value;
			// Save state
			setStoredValue(valueToStore);
			// Save to local storage
			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log("useLocalStorage()", error);
		}
	};
	return [storedValue, setValue] as const;
}