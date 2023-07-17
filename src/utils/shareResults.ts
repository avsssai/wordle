import { checkGuess } from "./checkAnswer";
import { solutionIndex } from "./words";
export function shareResults(
	gameState: string[],
	currentRow: number,
	answer: string,
	status: "passed" | "failed" | "running"
) {
	const correct = "🟩";
	const misplaced = "🟨";
	const incorrect = "⬛";

	let string = `Wordle ${solutionIndex} ${
		status === "passed" ? currentRow : "X"
	}/6`;

	for (const row of gameState) {
		const res = checkGuess(row, answer);
		let builder = ``;
		console.log(builder, "builder");
		if (res) {
			for (const letter of res) {
				if (letter.status === "correct") {
					builder += correct;
				} else if (letter.status === "misplaced") {
					builder += misplaced;
				} else {
					builder += incorrect;
				}
			}
		}
		string += "\n";
		string += builder;
	}
	string += "\n";
	string += "\n";
	return string;
}
