import React from "react";

export function useLocaStorage<T>(
	defaultValue: T,
	key: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [value, setValue] = React.useState<T>(() => {
		const valueInLocalStorage = window.localStorage.getItem("key");
		return !valueInLocalStorage
			? defaultValue
			: JSON.parse(valueInLocalStorage);
	});
	React.useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);
	return [value, setValue];
}
