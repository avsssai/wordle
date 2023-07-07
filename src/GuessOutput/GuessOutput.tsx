import React from "react";
import { AnswerContext } from "../hooks/useAnswer";
import { checkGuess } from "../utils/checkAnswer";
import { range } from "../utils/range";
import { cn } from "../utils/cn";

export default function GuessOutput({ gameState }: { gameState: string[] }) {
	// console.log(gameState);
	const { answer } = React.useContext(AnswerContext);
	return (
		<div className='flex flex-col gap-2'>
			{range(6).map((num) => (
				<GuessRow key={num} guess={gameState[num]} answer={answer} />
			))}
		</div>
	);
}

export function GuessRow({ guess, answer }: { guess: string; answer: string }) {
	const results = checkGuess(guess, answer);

	return (
		<div className='flex gap-[5px]'>
			{range(5).map((num) => (
				<span
					className={cn(
						"h-[52px] w-[52px] border border-gray-400 text-white flex items-center justify-center font-bold text-3xl capitalize",
						results && results[num].status === "correct"
							? "bg-correct"
							: results && results[num].status === "misplaced"
							? "bg-present"
							: results && results[num].status === "incorrect"
							? "bg-absent"
							: "bg-inherit"
					)}
					key={num}>
					{guess && results ? results[num].letter : ""}
				</span>
			))}
		</div>
	);
}
