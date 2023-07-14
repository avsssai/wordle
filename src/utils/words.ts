import {
	addDays,
	differenceInDays,
	formatISO,
	parseISO,
	startOfDay,
	startOfToday,
} from "date-fns";

import { POSSIBLE_WORDS, WORDS } from "../lib/words";

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

// 1st jan 2023
export const firstGameDate = new Date(2023, 0);
export const periodInDays = 1;

export const getIndex = (gameDate: Date) => {
	let start = firstGameDate;
	let index = -1;
	do {
		index++;
		start = addDays(start, periodInDays);
	} while (start <= gameDate);

	return index;
};

export const getWordOfTheDay = (index: number) => {
	if (index < 0) {
		throw new Error("Invalid index");
	}
	return WORDS[index % WORDS.length];
};

export const getSolution = (gameDate: Date) => {
	const index = getIndex(gameDate);
	console.log(index);
	const wordOfTheDay = getWordOfTheDay(index);
	return {
		solutionIndex: index,
		wordOfTheDay,
	};
};

export const getGameDay = () => {
	return startOfToday();
};

export const isValidWord = (word: string) => {
	const wordLowerCase = word.toLowerCase();
	return (
		POSSIBLE_WORDS.includes(wordLowerCase) || WORDS.includes(wordLowerCase)
	);
};

export const { solutionIndex, wordOfTheDay } = getSolution(getGameDay());
