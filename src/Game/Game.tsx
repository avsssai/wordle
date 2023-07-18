import React, { useContext } from "react";
import GuessOutput from "../GuessOutput/GuessOutput";
import { GameStatus, Stats } from "../types/state";
import { AnswerContext } from "../hooks/useAnswer";
import Toast from "../Toast/Toast";
import Keyboard from "../Keyboard/Keyboard";
import { checkLegitWord, isValidWord, letterInAphabet } from "../utils/words";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { isTodayTimestamp, unixTimeNow } from "../utils/dateUtils";
import { calculateKeyResults } from "../utils/letterResults";
import { IObjectStringKeyValue } from "../types/genericTypes";

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

const initialGameState: string[] = [""];
const initialGameStatus: GameStatus = "running";
const initialCurrentRow = 0;
const initialCurrentWord = "";
const initialShowToast = false;
const initialKeyRes = {};
interface GameProps {
	timeStamp: number;
	setTimeStamp: (value: number) => void;
	setStats: (value: Stats) => void;
	stats: Stats;
	setCompleteDialogOpen: (val: boolean) => void;
	gameState: string[];
	gameStatus: GameStatus;
	setGameState: (val: string[]) => void;
	setGameStatus: (val: GameStatus) => void;
	currentRow: number;
	setCurrentRow: (val: number) => void;
}

export default function Game({
	timeStamp,
	setTimeStamp,
	setStats,
	stats,
	setCompleteDialogOpen,
	gameState,
	gameStatus,
	setGameState,
	setGameStatus,
	currentRow,
	setCurrentRow,
}: GameProps) {
	const { answer } = useContext(AnswerContext);
	const [showToast, setShowToast] = useLocalStorage<boolean>(
		"show-toast",
		initialShowToast
	);
	const [toastMessage, setToastMessage] = React.useState<string>(answer);

	const [currentWord, setCurrentWord] = useLocalStorage<string>(
		"current-word",
		initialCurrentWord
	);
	const [keyRes, setKeyRes] =
		React.useState<IObjectStringKeyValue>(initialKeyRes);

	const [incorrectAnimation, setIncorrectAnimation] =
		React.useState<boolean>(false);

	console.log(calculateKeyResults(gameState, answer));
	React.useEffect(() => {
		setTimeout(
			() => setKeyRes(calculateKeyResults(gameState, answer)),
			3500
		);
	}, [answer, gameState]);
	// const [isAnimating, setIsAnimating] = React.useState<boolean>(false);
	// console.log(wordOfTheDay, "WORD OF THE DAY");
	React.useEffect(() => {
		const timeStampInWindow = window.localStorage.getItem("timestamp");
		if (!timeStampInWindow) {
			setTimeStamp(unixTimeNow());
		} else {
			// 1. if the time stamp is of yesterday, reset the local state
			// const isPreviousDayTimestamp = isPreviousDay(timeStamp);
			if (!isTodayTimestamp(timeStamp)) {
				setGameState(initialGameState);
				setGameStatus(initialGameStatus);
				setCurrentRow(initialCurrentRow);
				setCurrentWord(initialCurrentWord);
				setShowToast(initialShowToast);
			}
		}
	}, [
		setTimeStamp,
		setCurrentRow,
		setCurrentWord,
		setGameState,
		setGameStatus,
		setShowToast,
		timeStamp,
	]);

	const onEnter = React.useCallback(
		(stats: Stats) => {
			function percentageCalc(stats: Stats) {
				const totalWins = Object.values(stats.guesses).reduce(
					(acc, val) => {
						acc += val;
						return acc;
					},
					0
				);
				return Math.floor(
					(totalWins / (totalWins + stats.failCount)) * 100
				);
			}
			if (!checkLegitWord(currentWord)) {
				return;
			}

			if (!isValidWord(currentWord)) {
				setIncorrectAnimation(true);
				return;
			}
			setTimeStamp(unixTimeNow());
			const newState = [...gameState];
			newState[currentRow] = currentWord; // setting mutable state
			setGameState(newState);
			setCurrentWord("");
			setCurrentRow(currentRow + 1);
			setTimeout(() => {
				setKeyRes(calculateKeyResults(newState, answer));
			}, 3500);
			if (newState.length >= 6 && gameStatus === "running") {
				setTimeout(() => {
					setGameStatus("failed");

					// update the stats
					const newStats = { ...stats };
					newStats.currentStreak = 0;
					newStats.gamesPlayed++;
					newStats.failCount++;
					newStats.hasPlayed = true;
					newStats.isOnStreak = false;
					newStats.winPercentage = percentageCalc(newStats);
					setStats(newStats);
					setKeyRes(calculateKeyResults(newState, answer));
					setToastMessage(answer);
					setShowToast(true);
				}, 3500);
				setTimeout(() => {
					setCompleteDialogOpen(true);
				}, 4500);
			}

			if (currentWord === answer) {
				setTimeout(() => {
					setGameStatus("passed");

					const newStats = { ...stats };
					newStats.currentStreak++;
					newStats.gamesPlayed++;
					newStats.guesses[currentRow + 1]++;
					newStats.hasPlayed = true;
					newStats.isOnStreak = true;
					newStats.gamesWon++;
					newStats.maxStreak++;
					newStats.winPercentage = percentageCalc(newStats);
					setStats(newStats);

					setShowToast(true);

					setToastMessage(completedGameLauds[currentRow]);
					setKeyRes(calculateKeyResults(newState, answer));
				}, 3500);
				setTimeout(() => {
					setCompleteDialogOpen(true);
				}, 4500);
			}
		},
		[
			answer,
			currentRow,
			currentWord,
			gameState,
			gameStatus,
			setCompleteDialogOpen,
			setCurrentRow,
			setCurrentWord,
			setGameState,
			setGameStatus,
			setShowToast,
			setStats,
			setTimeStamp,
			setKeyRes,
		]
	);

	const onDelete = React.useCallback(
		(currentWord: string) => {
			if (currentWord.length > 0) {
				setCurrentWord((state) => state.slice(0, state.length - 1));
			}
		},
		[setCurrentWord]
	);

	const onKeyClick = React.useCallback(
		(e: KeyboardEvent | React.MouseEvent) => {
			if (e instanceof KeyboardEvent) {
				if (letterInAphabet(e.key)) {
					setCurrentWord((state) => state + e.key.toUpperCase());
				}
			} else {
				if (letterInAphabet((e.target as HTMLInputElement).value)) {
					setCurrentWord(
						(state) =>
							state +
							(e.target as HTMLInputElement).value.toUpperCase()
					);
				}
			}
		},
		[setCurrentWord]
	);

	React.useEffect(() => {
		const keyPressEvent = (e: KeyboardEvent) => {
			if (gameStatus !== "running") {
				return;
			}

			if (e.key === "Enter") {
				onEnter(stats);
			} else if (e.key === "Backspace" || e.key === "Delete") {
				// if (currentWord.length > 0) {
				// 	setCurrentWord((state) => state.slice(0, state.length - 1));
				// }
				onDelete(currentWord);
			} else {
				if (currentWord.length >= 5) {
					return;
				} else {
					// if (letterInAphabet(e.key)) {
					// 	setCurrentWord((state) => state + e.key.toUpperCase());
					// }
					onKeyClick(e);
				}
			}
		};
		window.addEventListener("keyup", keyPressEvent);
		return () => removeEventListener("keyup", keyPressEvent);
	}, [
		currentWord,
		onDelete,
		gameStatus,
		onEnter,
		onKeyClick,
		stats,
		keyRes,
		setKeyRes,
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
					incorrectAnimation={incorrectAnimation}
					setIncorrectAnimation={setIncorrectAnimation}
				/>
				D
			</div>
			<div className='lg:flex-1 sm:pb-20'>
				<Keyboard
					onEnter={onEnter}
					onDelete={onDelete}
					onKeyClick={onKeyClick}
					currentWord={currentWord}
					stats={stats}
					gameStatus={gameStatus}
					keyRes={keyRes}
				/>
			</div>
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
