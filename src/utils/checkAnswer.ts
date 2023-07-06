type Status = "correct" | "misplaced" | "incorrect";
interface Results {
	letter: string;
	status: Status;
}

export function checkGuess(
	guess: string,
	answer: string
): Results[] | undefined {
	if (!guess) {
		return;
	}
	const res: Results[] = [];
	const verified = "✔";
	const status: Status = "correct";
	const guessArr = guess.toUpperCase().split(""),
		answerArr = answer.split("");
	for (let i = 0; i < guessArr.length; i++) {
		if (guessArr[i] === answerArr[i]) {
			res[i] = { letter: guessArr[i], status };
			guessArr[i] = verified;
			answerArr[i] = verified;
		}
	}

	// misplaced letters
	for (let i = 0; i < guessArr.length; i++) {
		if (guessArr[i] === verified) {
			continue;
		}
		let status: Status = "incorrect";
		const misplacedLetterIndex = answerArr.findIndex(
			(char) => char === guessArr[i]
		);
		if (misplacedLetterIndex >= 0) {
			// it is misplaced
			status = "misplaced";
			answerArr[misplacedLetterIndex] = verified;
		}
		res[i] = { letter: guessArr[i], status };
	}

	return res;
}
