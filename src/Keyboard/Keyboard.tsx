import { GameStatus, Stats } from "../types/state";
import { IObjectStringKeyValue } from "../types/genericTypes";
import { cn } from "../utils/cn";
// import { calculateKeyResults } from "../utils/letterResults";

type KeyboardLayout = {
	[key: string]: string;
};
const keyboardLayout: KeyboardLayout[] = [
	{
		Q: "Q",
		W: "W",
		E: "E",
		R: "R",
		T: "T",
		Y: "Y",
		U: "U",
		I: "I",
		O: "O",
		P: "P",
	},
	{
		A: "A",
		S: "S",
		D: "D",
		F: "F",
		G: "G",
		H: "H",
		J: "J",
		K: "K",
		L: "L",
	},
	{
		Z: "Z",
		X: "X",
		C: "C",
		V: "V",
		B: "B",
		N: "N",
		M: "M",
	},
];

interface KeyboardProps {
	onEnter: (stats: Stats) => void;
	onDelete: (currentWord: string) => void;
	onKeyClick: (e: KeyboardEvent | React.MouseEvent) => void;
	currentWord: string;
	stats: Stats;
	gameStatus: GameStatus;
	keyRes: IObjectStringKeyValue;
}

export default function Keyboard({
	onEnter,
	onDelete,
	onKeyClick,
	currentWord,
	stats,
	gameStatus,
	keyRes,
}: KeyboardProps) {
	// const { answer } = useContext(AnswerContext);
	// const [keyRes, setKeyRes] = useState<IObject>({});
	const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
		const value = (e.target as HTMLInputElement).value;
		if (gameStatus !== "running") {
			return;
		}

		if (value === "enter") {
			onEnter(stats);
		} else if (value === "clear") {
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
	// const calculateResultsObj = useCallback(() => {
	// 	console.log(calculateKeyResults(gameState, answer));
	// }, [gameState, answer]);
	// console.log(keyRes);
	// useEffect(() => {
	// 	setKeyRes(calculateKeyResults(gameState, answer));
	// }, [answer, gameState.length, gameState]);
	console.log(keyRes);
	return (
		//wrapper

		<div className='flex flex-col justify-center  gap-2 text-white'>
			<Row
				row={keyboardLayout[0]}
				handleButtonClick={handleButtonClick}
				results={keyRes}
			/>
			<Row
				row={keyboardLayout[1]}
				handleButtonClick={handleButtonClick}
				results={keyRes}
			/>
			<LastKeyboardRow
				row={keyboardLayout[2]}
				handleButtonClick={handleButtonClick}
				results={keyRes}
			/>
		</div>
	);
}

function Row({
	row,
	handleButtonClick,
	results,
}: {
	row: KeyboardLayout;
	handleButtonClick: (e: React.MouseEvent<HTMLElement>) => void;
	results: IObjectStringKeyValue;
}) {
	return (
		<div className='text-white flex gap-[5px] justify-center'>
			{Object.entries(row).map(([key, letter]) => (
				<button
					key={key}
					className={cn(
						"h-[48px] flex justify-center items-center flex-1 bg-muted text-black max-w-[32px] rounded-md ",
						results[letter] === "correct"
							? "bg-[var(--color-correct)] text-white"
							: results[letter] === "misplaced"
							? "bg-[var(--color-misplaced)] text-white"
							: results[letter] === "incorrect"
							? "bg-[var(--color-incorrect)] text-white"
							: ""
					)}
					value={letter}
					onClick={handleButtonClick}>
					{letter as string}
				</button>
			))}
		</div>
	);
}

function LastKeyboardRow({
	row,
	handleButtonClick,
	results,
}: {
	row: KeyboardLayout;
	handleButtonClick: (e: React.MouseEvent<HTMLElement>) => void;
	results: IObjectStringKeyValue;
}) {
	return (
		<div className='text-white flex gap-[5px] justify-center'>
			<button
				className='h-[48px] flex justify-center items-center flex-1 bg-muted text-black rounded-md'
				onClick={handleButtonClick}
				value='enter'>
				Enter
			</button>
			{Object.entries(row).map(([key, letter]) => (
				<button
					key={key}
					value={letter}
					className={cn(
						"h-[48px] flex justify-center items-center flex-1 bg-muted text-black max-w-[32px] rounded-md ",
						results[letter] === "correct"
							? "bg-[var(--color-correct)] text-white"
							: results[letter] === "misplaced"
							? "bg-[var(--color-misplaced)] text-white"
							: results[letter] === "incorrect"
							? "bg-[var(--color-incorrect)] text-white"
							: ""
					)}
					onClick={handleButtonClick}>
					{letter as string}
				</button>
			))}
			<button
				className='h-[48px] flex justify-center items-center flex-1 bg-muted text-black rounded-md'
				value='clear'
				onClick={handleButtonClick}>
				Clear
			</button>
		</div>
	);
}
