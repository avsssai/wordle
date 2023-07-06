/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				present: "#b59f3b",
				correct: "#538d4e",
				absent: "#3a3a3c",
			},
		},
	},
	plugins: [],
};
