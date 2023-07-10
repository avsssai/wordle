import { cn } from "../utils/cn";
import { Variants, motion } from "framer-motion";

type IStatus = "correct" | "incorrect" | "misplaced";

const variants: Variants = {
	initial: {
		rotateX: 0,
	},
	final: ({ i, status }: { i: number; status: IStatus }) => ({
		rotateX: [0, 90, 0],
		background:
			status === "correct"
				? "var(--color-correct)"
				: status === "misplaced"
				? "var(--color-misplaced)"
				: "var(--color-absent)",
		transition: {
			// duration: 0.1,
			duration: 0.7,
			delay: 0.6 * i,
			// delay: 0.1 * i,
		},
	}),
};

export default function Cell({
	letter = "",
	completed = false,
	className = "",
	i,
	status,
}: {
	letter?: string;
	completed?: boolean;
	className?: string;
	i?: number;
	status?: IStatus;
}) {
	return (
		<motion.span
			variants={variants}
			initial='initial'
			animate={completed ? "final" : false}
			custom={{ i, status }}
			onAnimationComplete={() => console.log("completed")}
			className={cn(
				"h-[52px] w-[52px] border border-gray-400 text-white flex items-center justify-center font-bold text-3xl capitalize",
				className
			)}>
			{letter}
		</motion.span>
	);
}
