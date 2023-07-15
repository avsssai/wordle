import React from "react";
import "./App.css";
import Game from "./Game/Game";
import Header from "./Header/Header";
import { AnswerProvider } from "./hooks/useAnswer";
import { useLocalStorage } from "use-hooks";
import { isTodayTimestamp, unixTimeNow } from "./utils/dateUtils";
import { isToday } from "date-fns";
import TutorialDIalog from "./TutorialDialog/TutorialDialog";
import CompleteDialog from "./CompleteDialog/CompleteDialog";

function App() {
	const [timeStamp, setTimeStamp] = useLocalStorage(
		"timestamp",
		unixTimeNow()
	);
	const [tutorialDialogOpen, setTutorialDialogOpen] =
		React.useState<boolean>(false);
	const [completeDialogOpen, setCompleteDialogOpen] =
		React.useState<boolean>(false);
	return (
		<AnswerProvider>
			<TutorialDIalog
				open={tutorialDialogOpen}
				setOpen={setTutorialDialogOpen}
			/>
			<CompleteDialog
				open={completeDialogOpen}
				setOpen={setCompleteDialogOpen}
			/>
			<div className='w-full bg-black h-screen max-h-screen relative'>
				<Header
					setTutorialDialogOpen={setTutorialDialogOpen}
					setCompleteDialogOpen={setCompleteDialogOpen}
				/>
				<Game timeStamp={timeStamp} setTimeStamp={setTimeStamp} />
			</div>
		</AnswerProvider>
	);
}

export default App;
