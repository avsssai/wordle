import React from "react";
import "./App.css";
import Game from "./Game/Game";
import Header from "./Header/Header";
import { AnswerProvider } from "./hooks/useAnswer";
import { useLocalStorage } from "use-hooks";
import { isTodayTimestamp, unixTimeNow } from "./utils/dateUtils";
import { isToday } from "date-fns";

function App() {
	const [timeStamp, setTimeStamp] = useLocalStorage(
		"timestamp",
		unixTimeNow()
	);
	console.log(timeStamp, unixTimeNow(), isTodayTimestamp(timeStamp));
	return (
		<AnswerProvider>
			<div className='w-full bg-black h-screen max-h-screen relative'>
				<Header />
				<Game timeStamp={timeStamp} setTimeStamp={setTimeStamp} />
			</div>
		</AnswerProvider>
	);
}

export default App;
