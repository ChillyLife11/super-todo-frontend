/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/html/utils/withMT.js';

export default withMT({
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [],
});
