import React from "react";
import GuessOutput from "../GuessOutput/GuessOutput";
import { GameStatus } from "../types/state";

export default function Game() {
	const [gameState, setGameState] = React.useState<string[]>([]);
	const [gameStatus, setGameStatus] = React.useState<GameStatus>("running");
	function handleAddGuess(e: React.SyntheticEvent, guess: string) {
		e.preventDefault();
		if (gameState.length + 1 >= 6) {
			// return;

			// !Todo - add logic for a toast feedback

			// !Todo - or end the game
			setGameStatus("failed");
		}
		setGameState((state) => [...state, guess.toUpperCase()]);
	}
	return (
		<div className='flex flex-col justify-between py-10 h-full max-w-md m-auto'>
			<div className='flex-1 flex items-center justify-center'>
				<GuessOutput gameState={gameState} />
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
