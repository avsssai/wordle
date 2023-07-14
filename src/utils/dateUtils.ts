import {
	addMinutes,
	fromUnixTime,
	getUnixTime,
	isToday,
	subMinutes,
} from "date-fns";

export function unixTimeNow() {
	// return Date.now();
	const now = new Date();
	// const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
	return getUnixTime(now);
}

export function isTodayTimestamp(unixTimeStamp: number) {
	// const now = new Date();
	// const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
	// console.log(now, utc);

	const date = fromUnixTime(unixTimeStamp);
	const formattedDate = formatTimezone(date);
	console.log(formattedDate, date, "///");
	console.log(isToday(formatTimezone(date)));
	return isToday(formattedDate);
}

function formatTimezone(date: Date): Date {
	const offset = date.getTimezoneOffset();

	return Math.sign(offset) !== -1
		? addMinutes(date, offset)
		: subMinutes(date, Math.abs(offset));
}
