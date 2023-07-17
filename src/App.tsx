import React from "react";
import "./App.css";
import Game from "./Game/Game";
import Header from "./Header/Header";
import { AnswerProvider } from "./hooks/useAnswer";
import { useLocalStorage } from "use-hooks";
import { unixTimeNow } from "./utils/dateUtils";
import TutorialDIalog from "./TutorialDialog/TutorialDialog";
import CompleteDialog from "./CompleteDialog/CompleteDialog";
import { Stats } from "./types/state";
import { useStickyState } from "./hooks/useLocalStorage";

function App() {
	const [timeStamp, setTimeStamp] = useLocalStorage(
		"timestamp",
		unixTimeNow()
	);
	const [tutorialDialogOpen, setTutorialDialogOpen] =
		React.useState<boolean>(false);
	const [completeDialogOpen, setCompleteDialogOpen] =
		React.useState<boolean>(false);

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
				/>
			</div>
		</AnswerProvider>
	);
}

export default App;
