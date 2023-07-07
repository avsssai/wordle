import { motion, AnimatePresence, Variants } from "framer-motion";

const ToastVariants: Variants = {
	hide: {
		opacity: 0,
	},
	show: {
		opacity: [0, 1, 1, 0],
		transition: {
			duration: 5,
		},
	},
	exit: {
		opacity: 0,
	},
};

export default function Toast({ message }: { message: string }) {
	return (
		<AnimatePresence>
			<motion.div
				variants={ToastVariants}
				initial='hide'
				animate='show'
				exit='exit'
				className='absolute px-2 py-2 bg-white shadow-md rounded-sm text-sm font-semibold flex justify-center items-center top-10'>
				{message}
			</motion.div>
		</AnimatePresence>
	);
}
