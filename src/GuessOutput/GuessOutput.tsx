import React from "react";
import Cell from "../Cell/Cell";
import { range } from "../utils/range";
import { checkGuess } from "../utils/checkAnswer";
import { AnswerContext } from "../hooks/useAnswer";
import { motion, useAnimationControls } from "framer-motion";

export default function CheckGuessOutput({
	gameState,
	currentRow,
	currentWord,
	incorrectAnimation,
	setIncorrectAnimation,
}: {
	gameState: string[];
	currentRow: number;
	currentWord: string;
	incorrectAnimation: boolean;
	setIncorrectAnimation: (val: boolean) => void;
}) {
	return (
		<div className='flex flex-col gap-[5px]'>
			{range(6).map((num) =>
				gameState && gameState[num] ? (
					<CompletedRow word={gameState[num]} key={num} />
				) : num === currentRow ? (
					<OnGoingRow
						word={currentWord}
						key={num}
						incorrectAnimation={incorrectAnimation}
						setIncorrectAnimation={setIncorrectAnimation}
					/>
				) : (
					<EmptyRow key={num} />
				)
			)}
		</div>
	);
}

function EmptyRow() {
	return (
		<div className='flex gap-[5px]'>
			{range(5).map((num) => (
				<Cell key={num} />
			))}
		</div>
	);
}

function OnGoingRow({
	word,
	incorrectAnimation,
	setIncorrectAnimation,
}: {
	word: string;
	incorrectAnimation: boolean;
	setIncorrectAnimation: (val: boolean) => void;
}) {
	const controls = useAnimationControls();
	React.useEffect(() => {
		if (incorrectAnimation) {
			controls.start({
				x: [-10, 10, 0],
				transition: {
					duration: 0.2,
					type: "tween",
				},
			});
		}
	}, [incorrectAnimation, controls]);
	return (
		<motion.div
			className='flex gap-[5px]'
			animate={controls}
			onAnimationComplete={() => setIncorrectAnimation(false)}>
			{range(5).map((num) => (
				<Cell key={num} letter={word[num] ? word[num] : ""} />
			))}
		</motion.div>
	);
}

function CompletedRow({ word }: { word: string }) {
	const { answer } = React.useContext(AnswerContext);
	const results = checkGuess(word, answer);

	// const customClass = (num: number) =>
	// 	results && results[num].status === "correct"
	// 		? "bg-correct"
	// 		: results && results[num].status === "misplaced"
	// 		? "bg-present"
	// 		: results && results[num].status === "incorrect"
	// 		? "bg-absent"
	// 		: "bg-inherit";

	return (
		<div className='flex gap-[5px]'>
			{range(5).map((num) => (
				<Cell
					key={num}
					letter={results && results[num].letter}
					// className={customClass(num)}
					completed
					i={num}
					status={results && results[num].status}
				/>
			))}
		</div>
	);
}

// export function GuessRow({
// 	guess,
// 	answer,
// 	gameRow,
// 	currentWord,
// }: {
// 	guess: string;
// 	answer: string;
// 	gameRow: number;
// 	currentWord: string;
// }) {
// 	if (guess) {
// 		const results = checkGuess(guess, answer);
// 	}
// 	const results = checkGuess(guess, answer);
// 	return (
// 		<div className='flex gap-[5px]'>
// 			{range(5).map((num) => (
// 				<Cell>
// 					{currentWord && currentWord[num] ? currentWord[num] : ""}
// 				</Cell>
// 			))}
// 		</div>
// 	);
// }

// export function CompletedGuessRow({
// 	guess,
// 	answer,
// 	gameRow,
// }: {
// 	guess: string;
// 	answer: string;
// 	gameRow: number;
// }) {
// 	if (guess) {
// 		const results = checkGuess(guess, answer);
// 	}
// 	const results = checkGuess(guess, answer);

// 	return (
// 		<div className='flex gap-[5px]'>
// 			{range(5).map((num) => (
// 				<span
// 					className={cn(
// 						"h-[52px] w-[52px] border border-gray-400 text-white flex items-center justify-center font-bold text-3xl capitalize",
// 						results && results[num].status === "correct"
// 							? "bg-correct"
// 							: results && results[num].status === "misplaced"
// 							? "bg-present"
// 							: results && results[num].status === "incorrect"
// 							? "bg-absent"
// 							: "bg-inherit"
// 					)}
// 					key={num}>
// 					{guess && results ? results[num]?.letter : ""}
// 				</span>
// 			))}
// 		</div>
// 	);
// }
