import {
	addMinutes,
	fromUnixTime,
	getUnixTime,
	isToday,
	subMinutes,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export function isTodayInTimeZone(utc: number) {
	const date = fromUnixTime(utc);
	const zonedDate = utcToZonedTime(date, "Asia/Kolkata");
	return isToday(zonedDate);
}

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

	return isToday(formattedDate);
}

export function formatTimezone(date: Date): Date {
	const offset = date.getTimezoneOffset();

	return Math.sign(offset) !== -1
		? addMinutes(date, offset)
		: subMinutes(date, Math.abs(offset));
}

export function offsetByTimeZone() {
	return unixTimeNow() + 5 * 3600 + 30 * 60;
}
