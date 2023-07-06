import { HelpCircle, BarChart2, Settings } from "lucide-react";
export default function Header() {
	return (
		<div className='flex w-full p-4 text-white border-b-2 border-b-white absolute top-0 left-0'>
			<div className='capitalize font-bold text-3xl mr-auto md:m-auto'>
				Wordle
			</div>
			<div className='flex items-center gap-2'>
				<HelpCircle strokeWidth={3} />
				<BarChart2 strokeWidth={3} />
				<Settings strokeWidth={3} />
			</div>
		</div>
	);
}
