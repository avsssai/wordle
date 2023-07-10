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

export default function Keyboard() {
	return (
		//wrapper
		<div className='flex flex-col justify-center  gap-2 text-white'>
			<Row row={keyboardLayout[0]} />
			<Row row={keyboardLayout[1]} />
			<LastKeyboardRow row={keyboardLayout[2]} />
		</div>
	);
}

function Row({ row }: { row: KeyboardLayout }) {
	return (
		<div className='text-white flex gap-2 justify-center'>
			{Object.entries(row).map(([key, letter]) => (
				<button
					key={key}
					className='h-[58px] flex justify-center items-center flex-1 bg-muted text-black max-w-[32px] rounded-md '>
					{letter as string}
				</button>
			))}
		</div>
	);
}

function LastKeyboardRow({ row }: { row: KeyboardLayout }) {
	return (
		<div className='text-white flex gap-2 justify-center'>
			<button className='h-[58px] flex justify-center items-center flex-1 bg-muted text-black rounded-md'>
				Enter
			</button>
			{Object.entries(row).map(([key, letter]) => (
				<button
					key={key}
					className='h-[58px] flex justify-center items-center flex-1 bg-muted text-black max-w-[32px] md:max-w-[44px] rounded-md'>
					{letter as string}
				</button>
			))}
			<button className='h-[58px] flex justify-center items-center flex-1 bg-muted text-black rounded-md'>
				Clear
			</button>
		</div>
	);
}
