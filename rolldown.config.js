import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';

import { defineConfig } from 'rolldown';

export default defineConfig({
	input: './src/frontend/main.tsx',
	output: {
		file: './output/frontend/script.js',
		minify: true
	},
	plugins: [
		copy({
			targets: [
				{src: 'src/frontend/**/*.html', dest: 'output/frontend/'}
			]
		}),
		scss({
			fileName: 'style.css',
			outputStyle: 'compressed',
			silenceDeprecations: ['legacy-js-api']
		})
	],
	define: {
		'process.env.NODE_ENV': "'production'"
	}
});
