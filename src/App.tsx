import "./App.css";
import Game from "./Game/Game";
import Header from "./Header/Header";
import { AnswerProvider } from "./hooks/useAnswer";

const ANSWER = "SHIVA";

function App() {
	return (
		<AnswerProvider>
			<div className='w-full bg-black h-screen max-h-screen relative'>
				<Header />
				<Game />
			</div>
		</AnswerProvider>
	);
}

export default App;
