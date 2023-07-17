import { IObjectStringKeyValue } from "../types/genericTypes";
import { Results, checkGuess } from "./checkAnswer";

export function calculateKeyResults(gameState: string[], answer: string) {
	const res: (Results[] | undefined)[] = [];
	const letterObj: IObjectStringKeyValue = {};
	for (const word of gameState) {
		if (checkGuess(word, answer)) {
			res.push(checkGuess(word, answer));
		}
	}

	for (const result of res) {
		if (result) {
			for (const letterStatus of result) {
				if (!(letterStatus.letter in letterObj)) {
					letterObj[letterStatus.letter] = letterStatus.status;
				} else {
					const { letter, status } = letterStatus;
					if (letterObj[letter] === "correct") {
						continue;
					} else if (
						letterObj[letter] === "misplaced" &&
						status === "correct"
					) {
						letterObj[letter] = "correct";
					} else if (letterObj[letter] === "misplaced") {
						letterObj[letter] = "misplaced";
						continue;
					} else {
						letterObj[letter] = status;
					}
				}
			}
		}
	}
	return letterObj;
}
