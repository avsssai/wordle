export function checkLegitWord(word: string) {
	if (word.length !== 5 || !word || !everyLetterInLetterAscii(word)) {
		return false;
	}
	return true;
}

function everyLetterInLetterAscii(word: string) {
	return word.split("").every((letter) => {
		const charCode = letter.charCodeAt(0);
		if (
			(charCode >= 65 && charCode <= 90) ||
			(charCode >= 97 && charCode <= 122)
		) {
			return true;
		}
		return false;
	});
}

export function letterInAphabet(letter: string) {
	const regexPattern = /^[a-zA-z]$/;
	return regexPattern.test(letter);
}
