/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				present: "var(--color-misplaced)",
				correct: "var(--color-correct)",
				absent: "var(--color-incorrect)",
				muted: "var(--color-muted)",
			},
		},
	},
	plugins: [],
};
