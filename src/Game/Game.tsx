import React, { useContext } from "react";
import GuessOutput from "../GuessOutput/GuessOutput";
import { GameStatus } from "../types/state";
import { AnswerContext } from "../hooks/useAnswer";
import { ToastContainer, toast } from "react-toastify";
import Toast from "../Toast/Toast";
import { checkGuess } from "../utils/checkAnswer";

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
	const [gameState, setGameState] = React.useState<string[]>([]);
	const [gameStatus, setGameStatus] = React.useState<GameStatus>("running");
	const { answer } = useContext(AnswerContext);
	const [showToast, setShowToast] = React.useState<boolean>(false);
	const [toastMessage, setToastMessage] = React.useState<string>(answer);
	function handleAddGuess(e: React.SyntheticEvent, guess: string) {
		e.preventDefault();
		if (gameState.length + 1 >= 6) {
			// return;
			// !Todo - add logic for a toast feedback
			// !Todo - or end the game
			setGameStatus("failed");
			setShowToast(true);
		}

		// !Todo - game success logic
		setGameState((state) => [...state, guess.toUpperCase()]);
		const allCorrect = checkGuess(guess, answer);
		if (allCorrect?.every((char) => char.status === "correct")) {
			setGameStatus("passed");
			setToastMessage(completedGameLauds[gameState.length]);
			console.log(completedGameLauds[gameState.length], toastMessage);
			setShowToast(true);
		}
	}
	console.log(gameStatus);
	return (
		<div className='flex flex-col justify-between py-10 h-full max-w-md m-auto relative'>
			<div className='flex-1 flex items-center justify-center relative'>
				{showToast && gameStatus !== "running" && (
					<Toast message={toastMessage} />
				)}
				<GuessOutput gameState={gameState} />T r
			</div>

			<Input handleAddGuess={handleAddGuess} gameStatus={gameStatus} />
		</div>
	);
}

const Input = ({
	handleAddGuess,
	gameStatus,
}: {
	handleAddGuess: (e: React.SyntheticEvent, guess: string) => void;
	gameStatus: GameStatus;
}) => {
	const [input, setInput] = React.useState<string>("");

	return (
		<form
			onSubmit={(e) => {
				handleAddGuess(e, input);
				setInput("");
			}}>
			<input
				type='text'
				className='p-3 font-bold text-xl w-full uppercase'
				onChange={(e) => setInput(e.target.value)}
				value={input}
				placeholder='guess the word'
				disabled={gameStatus !== "running"}
				pattern='^[a-zA-Z]{5}$'
				title='The word entered should be exactly 5 letters long.'
			/>
		</form>
	);
};
