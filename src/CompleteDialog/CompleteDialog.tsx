import Countdown from "react-countdown";
import MyDialog from "../Dialog/Dialog";
import { getUnixTime, startOfTomorrow } from "date-fns";

function getNextDayStart() {
	const tmmrw = startOfTomorrow();
	const tmrwUnix = getUnixTime(tmmrw) * 1000;
	return tmrwUnix;
}

export default function CompleteDialog({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (val: boolean) => void;
}) {
	console.log(getNextDayStart());
	return (
		<MyDialog title='Stats' open={open} setOpen={setOpen}>
			<div>
				<h1>
					Time till next game: <Countdown date={getNextDayStart()} />
				</h1>
			</div>
		</MyDialog>
	);
}
