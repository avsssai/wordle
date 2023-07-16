export type GameStatus = "running" | "passed" | "failed";
export interface Stats {
	averageGuesses: number;
	currentStreak: number;
	gamesPlayed: number;
	gamesWon: number;
	guesses: Guesses;
	hasPlayed: boolean;
	isOnStreak: boolean;
	maxStreak: number;
	winPercentage: number;
	failCount: number;
}

interface Guesses {
	[key: number]: number;
}

// interface Guesses extends NumberObj {
// 	fail: number;
// }
