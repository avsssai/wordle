import { Dialog } from "@headlessui/react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { XCircle } from "react-feather";

const dialogVariants: Variants = {
	close: {
		opacity: 0,
		y: -50,
	},
	open: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

export default function MyDialog({
	open,
	setOpen,
	title,
	children,
}: {
	open: boolean;
	title: string;
	setOpen: (val: boolean) => void;
	children?: React.ReactNode;
}) {
	return (
		<AnimatePresence>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				className='relative z-50 isolate'>
				<div className='fixed inset-0 bg-black/50' aria-hidden='true' />
				<motion.div
					variants={dialogVariants}
					initial='close'
					animate='open'
					className='fixed inset-0 flex items-center justify-center p-4'>
					<Dialog.Panel className='w-full relative max-w-sm rounded bg-stone-800 text-white py-6 px-4 '>
						<div className='absolute top-2 right-2 cursor-pointer z-150'>
							<XCircle
								color='white'
								onClick={() => setOpen(false)}
							/>
						</div>
						<Dialog.Title className='capitalize font-bold text-2xl'>
							{title}
						</Dialog.Title>
						{children}
					</Dialog.Panel>
				</motion.div>
			</Dialog>
		</AnimatePresence>
	);
}
