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
import { Share } from "react-feather";
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
