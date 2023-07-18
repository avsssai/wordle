import React from "react";
import Countdown from "react-countdown";
import MyDialog from "../Dialog/Dialog";
import { getUnixTime, startOfTomorrow } from "date-fns";
import { Stats } from "../types/state";
import {
	XYPlot,
	VerticalGridLines,
	HorizontalGridLines,
	XAxis,
	YAxis,
	HorizontalBarSeries,
} from "react-vis";
import Balloon from "../Balloon";
import { Share } from "react-feather";
import { AnswerContext } from "../hooks/useAnswer";
import { Variants, motion } from "framer-motion";
import { random, range } from "../utils/range";
import { IObjectNumberKeyValue } from "../types/genericTypes";
import { cn } from "../utils/cn";

function getNextDayStart() {
	const tmmrw = startOfTomorrow();
	const tmrwUnix = getUnixTime(tmmrw) * 1000;
	return tmrwUnix;
}

export default function CompleteDialog({
	open,
	setOpen,
	stats,
	calculateResults,
}: {
	open: boolean;
	setOpen: (val: boolean) => void;
	stats: Stats;
	calculateResults: () => string;
}) {
	const chartDistribution = (stats: Stats) => {
		const res: { x: number; y: number }[] = [];
		Object.entries(stats.guesses).map(([key, value]) => {
			const newObj = { y: parseInt(key), x: value * 100 };
			res.push(newObj);
		});
		return res;
	};
	const data = chartDistribution(stats);
	const { answer } = React.useContext(AnswerContext);
	console.log(answer);

	if (answer === "SRUTI") {
		return (
			<MyDialog title='' open={open} setOpen={setOpen}>
				{/* <Balloon /> */}
				<BalloonFloatUp />
				<div className='text-center relative'>
					<h3 className='text-3xl mb-4'>It's July 20th!</h3>
					<h4 className='text-base mb-4'>It's Sruthi's B'day!</h4>
					<LetterPullUp words='HAPPY BIRTHDAY' />
					<LetterPullUp words='SRUTHI' />
				</div>
			</MyDialog>
		);
	}

	return (
		<MyDialog title='Stats' open={open} setOpen={setOpen}>
			<div>
				{!stats.hasPlayed ? (
					<>
						<div className='flex justify-between px-10 my-8'>
							<div className='flex flex-col text-center'>
								<div className='font-bold text-3xl'>0</div>
								<div className='text-[10px]'>Played</div>
							</div>
							<div className='flex flex-col text-center'>
								<div className='font-bold text-3xl'>0</div>
								<div className='text-[10px]'>Win %</div>
							</div>
							<div className='flex flex-col text-center'>
								<div className='font-bold text-3xl'>0</div>
								<div className='text-[10px]'>
									Current Streak
								</div>
							</div>
							<div className='flex flex-col text-center'>
								<div className='font-bold text-3xl'>0</div>
								<div className='text-[10px]'>Max Streak</div>
							</div>
						</div>
						<div className='mb-10'>
							<h1 className='text-[12px] mb-2 font-bold'>
								GUESS DISTRIBUTION
							</h1>
							<p className='text-[12px]'>No Data</p>
						</div>
					</>
				) : (
					<>
						<div className='flex justify-between px-10 my-8'>
							<div className='flex flex-col text-center'>
								<div className='font-bold text-3xl'>
									{stats.gamesPlayed}
								</div>
								<div className='text-[10px]'>Played</div>
							</div>
							<div className='flex flex-col text-center'>
								<div className='font-bold text-3xl'>
									{stats.winPercentage}
								</div>
								<div className='text-[10px]'>Win %</div>
							</div>
							<div className='flex flex-col text-center'>
								<div className='font-bold text-3xl'>
									{stats.currentStreak}
								</div>
								<div className='text-[10px]'>
									Current Streak
								</div>
							</div>
							<div className='flex flex-col text-center'>
								<div className='font-bold text-3xl'>
									{stats.maxStreak}
								</div>
								<div className='text-[10px]'>Max Streak</div>
							</div>
						</div>
						<div className='mb-10'>
							<h1 className='text-[12px] mb-2 font-bold'>
								GUESS DISTRIBUTION
							</h1>
							<div className='text-[12px]'>
								<XYPlot height={300} width={300}>
									<VerticalGridLines />
									<HorizontalGridLines />
									<XAxis style={{ fill: "white" }} />
									<YAxis style={{ fill: "white" }} />
									<HorizontalBarSeries
										barWidth={0.5}
										data={data}
										animation
										style={{
											fill: `#538d4e`,
											stroke: `#538d4e`,
										}}
									/>
								</XYPlot>
							</div>
						</div>
						<div className='flex flex-col justify-center items-center text-3xl'>
							<h1 className='text-[12px] font-bold'>
								{" "}
								Time till next game:
							</h1>{" "}
							<Countdown date={getNextDayStart()} />
						</div>

						<button
							className='bg-[var(--color-correct)] px-2 py-2 flex justify-center items-center mt-4 gap-2 text-sm rounded-sm mx-auto outline-white outline-offset-2'
							onClick={() => {
								navigator.clipboard.writeText(
									calculateResults()
								);
							}}>
							Share <Share color='white' size={12} />
						</button>
					</>
				)}
			</div>
		</MyDialog>
	);
}

export function BalloonFloatUp() {
	const balloonVariants: Variants = {
		start: {
			y: 1000,
			x: 0,
		},
		end: ({ num }: { num: number }) => ({
			y: -1000,
			x: [-100, 0, 100],
			transition: {
				duration: num * 1.3,
				delay: num * 0.5,
				repeat: 5,
			},
		}),
	};

	return (
		<div>
			{range(50).map((num) => {
				const randomNumber = random(3);
				const Balloon = balloons[randomNumber]();
				const randomX = random(200);
				const randomZ = random(100);
				// const classNameCons = `absolute left-${randomX} z-[${randomZ})}]`;
				//class here
				return (
					<motion.div
						custom={{ num }}
						variants={balloonVariants}
						className={cn("absolute w-full h-full")}
						initial='start'
						key={num}
						style={{ left: `${randomX}px`, zIndex: `${randomZ}` }}
						animate='end'>
						{Balloon}
					</motion.div>
				);
			})}
		</div>
	);
}

const SmallBalloon = () => {
	// const classNameCons = `relative left-10 z-[${z}]`;
	return (
		<div>
			<Balloon height={100} width={90} />
		</div>
	);
};
const MediumBalloon = () => {
	const x = random(100);
	const z = random(100);

	const classNameCons = `absolute left-[${x}px] z-[${z}]`;
	return (
		<div className={classNameCons}>
			<Balloon height={150} width={140} />
		</div>
	);
};
const LargeBalloon = () => {
	const x = random(100);
	const z = random(100);

	const classNameCons = `absolute left-[${x}px] z-[${z}]`;
	console.log(classNameCons);
	return (
		<div className={classNameCons}>
			<Balloon height={300} width={290} />
		</div>
	);
};
const balloons: IObjectNumberKeyValue = {
	0: SmallBalloon,
	1: MediumBalloon,
	2: LargeBalloon,
};
export function LetterPullUp({ words }: { words: string }) {
	const letters = words.split("");

	const pullupVariant = {
		initial: { y: 100, opacity: 0 },
		animate: (i: number) => ({
			y: 0,
			opacity: 1,
			transition: {
				delay: i * 0.05, // Delay each letter's animation by 0.05 seconds
			},
		}),
	};

	return (
		<div className='flex justify-center'>
			{letters.map((letter, i) => (
				<motion.h1
					key={i}
					variants={pullupVariant}
					initial='initial'
					animate='animate'
					custom={i}
					className='text-center font-display text-base font-bold tracking-[-0.02em] drop-shadow-sm'>
					{letter === " " ? <span>&nbsp;</span> : letter}
				</motion.h1>
			))}
		</div>
	);
}
