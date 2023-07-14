import React from "react";
import { wordOfTheDay } from "../utils/words";
// import { wordOfTheDay } from "../utils/words";

const ANSWER = wordOfTheDay.toUpperCase();
interface AnswerContext {
	answer: string;
}

export const AnswerContext = React.createContext<AnswerContext>({
	answer: ANSWER,
});

export const AnswerProvider = ({ children }: { children: React.ReactNode }) => {
	const [answer, setAnswer] = React.useState<string>(ANSWER);
	return (
		<AnswerContext.Provider value={{ answer }}>
			{children}
		</AnswerContext.Provider>
	);
};

export const useAnswerContext = (): AnswerContext => {
	const context = React.useContext(AnswerContext);
	if (!context) {
		throw new Error("Please wrap the application in AnswerProvider");
	}
	return context;
};
