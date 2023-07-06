export function range(start: number, stop?: number, step = 1) {
	// range(5) = [0,1,2,3,4]
	if (typeof stop === "undefined") {
		stop = start;
		start = 0;
	}
	const res = [];
	for (let i = start; i < stop; i += step) {
		res.push(i);
	}
	return res;
}
