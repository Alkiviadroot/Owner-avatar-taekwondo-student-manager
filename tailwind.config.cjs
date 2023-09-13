// @ts-check <- enable type checking!
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
const { skeleton } = require('@skeletonlabs/tw-plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],

	plugins: [forms, typography, skeleton({
		themes: {
			preset: ["vintage"]
		}
	})
	]
};
