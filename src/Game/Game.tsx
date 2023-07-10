import React, { useContext } from "react";
import GuessOutput from "../GuessOutput/GuessOutput";
import { GameStatus } from "../types/state";
import { AnswerContext } from "../hooks/useAnswer";
import Toast from "../Toast/Toast";
import { checkGuess } from "../utils/checkAnswer";
import Keyboard from "../Keyboard/Keyboard";
import { checkLegitWord, letterInAphabet } from "../utils/words";

interface IObject {
	[key: number]: string;
}

const completedGameLauds: IObject = {
	0: "Genius!",
	1: "Magic!",
	2: "Amazing!",
	3: "Excellent!",
	4: "Good!",
	5: "Good!",
};

export default function Game() {
	const [gameState, setGameState] = React.useState<string[]>([""]);
	const [gameStatus, setGameStatus] = React.useState<GameStatus>("running");
	const { answer } = useContext(AnswerContext);
	const [showToast, setShowToast] = React.useState<boolean>(false);
	const [toastMessage, setToastMessage] = React.useState<string>(answer);
	const [currentRow, setCurrentRow] = React.useState<number>(0);
	const [currentWord, setCurrentWord] = React.useState<string>("");
	console.log(currentWord, gameState);
	React.useEffect(() => {
		const keyPressEvent = (e: KeyboardEvent) => {
			if (e.key === "Enter") {
				if (!checkLegitWord(currentWord)) {
					return;
				}
				if (gameState.length >= 5 && gameStatus === "running") {
					setTimeout(() => {
						setGameStatus("failed");
						setToastMessage(answer);
						setShowToast(true);
					}, 3500);
				}
				gameState[currentRow] = currentWord;
				setCurrentWord("");
				setCurrentRow((state) => state + 1);
			} else if (e.key === "Backspace" || e.key === "Delete") {
				if (currentWord.length > 0) {
					setCurrentWord((state) => state.slice(0, state.length - 1));
				}
			} else {
				if (currentWord.length >= 5) {
					return;
				} else {
					if (letterInAphabet(e.key)) {
						setCurrentWord((state) => state + e.key);
					}
				}
			}
		};
		window.addEventListener("keyup", keyPressEvent);
		return () => removeEventListener("keyup", keyPressEvent);
	}, [
		currentWord,
		gameState,
		currentRow,
		setGameState,
		setCurrentWord,
		setCurrentRow,
		answer,
		gameStatus,
	]);

	return (
		<div className='flex flex-col justify-between pt-10 h-full max-w-md m-auto relative'>
			<div className='flex-1 flex items-center justify-center relative'>
				{showToast && gameStatus !== "running" && (
					<Toast message={toastMessage} />
				)}
				<GuessOutput
					gameState={gameState}
					currentRow={currentRow}
					currentWord={currentWord}
				/>
				T r
			</div>
			<Keyboard />
			{/* <Input handleAddGuess={handleAddGuess} gameStatus={gameStatus} /> */}
		</div>
	);
}

// const Input = ({
// 	handleAddGuess,
// 	gameStatus,
// }: {
// 	handleAddGuess: (e: React.SyntheticEvent, guess: string) => void;
// 	gameStatus: GameStatus;
// }) => {
// 	const [input, setInput] = React.useState<string>("");

// 	return (
// 		<form
// 			onSubmit={(e) => {
// 				handleAddGuess(e, input);
// 				setInput("");
// 			}}>
// 			<input
// 				type='text'
// 				className='p-3 font-bold text-xl w-full uppercase'
// 				onChange={(e) => setInput(e.target.value)}
// 				value={input}
// 				placeholder='guess the word'
// 				disabled={gameStatus !== "running"}
// 				pattern='^[a-zA-Z]{5}$'
// 				title='The word entered should be exactly 5 letters long.'
// 			/>
// 		</form>
// 	);
// };

// React.useEffect(() => {
// 	function handleAddGuess() {
// 		if (gameState.length >= 6) {
// 			// return;
// 			// !Todo - add logic for a toast feedback
// 			// !Todo - or end the game
// 			setGameStatus("failed");
// 			setShowToast(true);
// 		}

// 		// !Todo - game success logic
// 		// setGameState((state) => [...state, guess.toUpperCase()]);
// 		const guess = gameState[gameRow];
// 		const allCorrect = checkGuess(guess, answer);
// 		if (allCorrect?.every((char) => char.status === "correct")) {
// 			setGameStatus("passed");
// 			setToastMessage(completedGameLauds[gameState.length]);
// 			setShowToast(true);
// 		}
// 	}
// 	const handleKeyPress = (e: KeyboardEvent) => {
// 		// console.log("Key Pressed : " + e.key);
// 		console.log(gameState);
// 		if (e.key === "Enter") {
// 			if (gameState[gameRow].length < 5) {
// 				return;
// 			}
// 			if (gameStatus === "running") {
// 				handleAddGuess();
// 				setGameRow(gameRow + 1);
// 			}
// 			return;
// 		}
// 		const charCode = e.key.charCodeAt(0);

// 		if (
// 			(charCode >= 65 && charCode <= 90) ||
// 			(charCode >= 97 && charCode <= 122)
// 		) {
// 			console.log("pressed +" + String.fromCharCode(charCode));
// 			console.log(gameState[gameRow]?.length);
// 			// !Todo - add to the state, depending on the row
// 			if (!gameState[gameRow] || gameState[gameRow]?.length < 5) {
// 				// const currentRow = gameState[gameRow];
// 				// const newWord = currentRow + String.fromCharCode(charCode);
// 				// const newState = [...gameState];
// 				// newState[gameRow] = newWord;
// 				// console.log(newWord);
// 				// setGameState(newState);
// 				console.log(gameRow);
// 				const newState = [...gameState];
// 				const currentWord = newState[gameRow]
// 					? newState[gameRow]
// 					: "";
// 				const newWord = currentWord + String.fromCharCode(charCode);
// 				newState[gameRow] = newWord;
// 				setGameState(newState);
// 			} else {
// 				return;
// 			}
// 		} else {
// 			return;
// 		}
// 	};
// 	window.addEventListener("keypress", handleKeyPress);
// 	return () => window.removeEventListener("keypress", handleKeyPress);
// }, [gameRow, gameState, setGameRow, answer, gameStatus]);
