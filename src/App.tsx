import React from "react";
import "./App.css";
import Game from "./Game/Game";
import Header from "./Header/Header";
import { AnswerContext, AnswerProvider } from "./hooks/useAnswer";
import { useLocalStorage } from "use-hooks";
import { unixTimeNow } from "./utils/dateUtils";
import TutorialDIalog from "./TutorialDialog/TutorialDialog";
import CompleteDialog from "./CompleteDialog/CompleteDialog";
import { GameStatus, Stats } from "./types/state";
import { useStickyState } from "./hooks/useLocalStorage";
import { shareResults } from "./utils/shareResults";

const initialGameStatus: GameStatus = "running";
const initialGameState: string[] = [""];
const initialCurrentRow = 0;

function App() {
	const { answer } = React.useContext(AnswerContext);
	const [timeStamp, setTimeStamp] = useLocalStorage(
		"timestamp",
		unixTimeNow()
	);
	const [tutorialDialogOpen, setTutorialDialogOpen] =
		React.useState<boolean>(false);
	const [completeDialogOpen, setCompleteDialogOpen] =
		React.useState<boolean>(false);
	const [gameState, setGameState] = useLocalStorage<string[]>(
		"game-state",
		initialGameState
	);
	const [gameStatus, setGameStatus] = useLocalStorage<GameStatus>(
		"game-status",
		initialGameStatus
	);

	const [currentRow, setCurrentRow] = useLocalStorage<number>(
		"current-row",
		initialCurrentRow
	);

	const initialStatState = {
		averageGuesses: 0,
		currentStreak: 0,
		gamesPlayed: 0,
		gamesWon: 0,
		guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
		hasPlayed: false,
		isOnStreak: false,
		maxStreak: 0,
		winPercentage: 0,
		failCount: 0,
	};

	const [stats, setStats] = useStickyState<Stats>("stats", initialStatState);

	const calculateResults = React.useCallback(
		() => shareResults(gameState, currentRow, answer, gameStatus),
		[gameState, gameStatus, answer, currentRow]
	);

	React.useEffect(() => {
		if (!stats.hasPlayed) {
			setTutorialDialogOpen(true);
		}
	}, [stats.hasPlayed]);

	return (
		<AnswerProvider>
			<TutorialDIalog
				open={tutorialDialogOpen}
				setOpen={setTutorialDialogOpen}
			/>
			<CompleteDialog
				open={completeDialogOpen}
				setOpen={setCompleteDialogOpen}
				stats={stats}
				calculateResults={calculateResults}
			/>
			<div className='w-full bg-black h-screen max-h-screen relative'>
				<Header
					setTutorialDialogOpen={setTutorialDialogOpen}
					setCompleteDialogOpen={setCompleteDialogOpen}
				/>
				<Game
					timeStamp={timeStamp}
					setTimeStamp={setTimeStamp}
					setStats={setStats}
					stats={stats}
					setCompleteDialogOpen={setCompleteDialogOpen}
					gameState={gameState}
					setGameState={setGameState}
					gameStatus={gameStatus}
					setGameStatus={setGameStatus}
					currentRow={currentRow}
					setCurrentRow={setCurrentRow}
				/>
			</div>
		</AnswerProvider>
	);
}

export default App;
