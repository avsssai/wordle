import MyDialog from "../Dialog/Dialog";
import { cn } from "../utils/cn";
import { motion, Variants } from "framer-motion";

export default function TutorialDIalog({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (val: boolean) => void;
}) {
	return (
		<MyDialog title='How to Play?' open={open} setOpen={setOpen}>
			<div className='relative text-sm'>
				<h3 className='capitalize mb-4 '>
					Guess the wordle in 6 tries or less.
				</h3>
				<ul className='list-disc list-inside text-xs gap-2 flex flex-col mb-4'>
					<li className='list-item'>
						Each guess must be a valid 5-letter word.
					</li>
					<li>
						The color of the tiles will change to show how close
						your guess was to the word.
					</li>
				</ul>
				<div>
					<h4 className='font-bold mb-4'>Examples</h4>
					<div className='flex flex-col mb-4'>
						<div className='flex gap-1 mb-1'>
							{correctExample.map((cell, index) => (
								<Cell
									key={index}
									animate={cell.animate}
									children={cell.letter}
									type={cell.type}
								/>
							))}
						</div>
						<h4>
							{" "}
							<span className='font-bold'>W</span> is in the word
							and in the correct spot.
						</h4>
					</div>
					<div className='flex flex-col mb-4'>
						<div className='flex gap-1 mb-1'>
							{misplacedExample.map((cell, index) => (
								<Cell
									key={index}
									animate={cell.animate}
									children={cell.letter}
									type={cell.type}
								/>
							))}
						</div>
						<h4>
							{" "}
							<span className='font-bold'>I</span> is in the word
							but in the wrong spot.
						</h4>
					</div>
					<div className='flex flex-col mb-4'>
						<div className='flex gap-1 mb-1'>
							{incorrectExample.map((cell, index) => (
								<Cell
									key={index}
									animate={cell.animate}
									children={cell.letter}
									type={cell.type}
								/>
							))}
						</div>
						<h4>
							{" "}
							<span className='font-bold'>U</span> is not in the
							word in any spot.
						</h4>
					</div>
					<div className='border-t-2'>
						<h4 className='mt-2'>
							A new puzzle is released daily at midnight.
						</h4>
					</div>
				</div>
			</div>
		</MyDialog>
	);
}

const correctExample = [
	{ letter: "W", animate: true, type: "correct" },
	{ letter: "E", animate: false },
	{ letter: "A", animate: false },
	{ letter: "R", animate: false },
	{ letter: "Y", animate: false },
];
const misplacedExample = [
	{ letter: "P", animate: false },
	{ letter: "I", animate: true, type: "misplaced" },
	{ letter: "L", animate: false },
	{ letter: "L", animate: false },
	{ letter: "S", animate: false },
];
const incorrectExample = [
	{ letter: "V", animate: false },
	{ letter: "A", animate: false },
	{ letter: "G", animate: false },
	{ letter: "U", animate: true, type: "incorrect" },
	{ letter: "E", animate: false },
];

const variants: Variants = {
	initial: {
		rotateX: 0,
		backgroundColor: "rgba(0,0,0,0)",
	},
	final: (type: "correct" | "incorrect" | "misplaced") => ({
		rotateX: [0, 90, 0],
		backgroundColor:
			type === "correct"
				? "var(--color-correct)"
				: type === "incorrect"
				? "var(--color-incorrect)"
				: "Var(--color-misplaced)",
		transition: {
			duration: 0.7,
			delay: 0.4,
		},
	}),
};

function Cell({
	type,
	animate,
	children,
}: {
	type?: string;
	animate: boolean;
	children: React.ReactNode;
}) {
	let customClass =
		"h-[32px] w-[33px] border bg-black text-white flex justify-center items-center font-bold text-xl";
	if (type === "correct") {
		customClass = `h-[32px] w-[33px] border bg-black bg-[var(--color-correct)] text-white flex justify-center items-center font-bold text-xl`;
	} else if (type === "misplaced") {
		customClass = `h-[32px] w-[33px] border bg-black bg-[var(--color-misplaced)] text-white flex justify-center items-center font-bold text-xl`;
	} else if (type === "incorrect") {
		customClass = `h-[32px] w-[33px] border bg-black bg-[var(--color-incorrect)] text-white flex justify-center items-center font-bold text-xl`;
	}
	return (
		<motion.div
			className={customClass}
			variants={variants}
			initial='initial'
			animate={!animate ? false : "final"}
			custom={type}>
			{children}
		</motion.div>
	);
}
