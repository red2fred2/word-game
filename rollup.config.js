import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
	input: './src/frontend/main.tsx',
	output: {
		file: './output/frontend/script.js',
		format: 'iife',
		name: 'bundle'
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
			babelHelpers: 'bundled'
		}),
		commonjs({
			sourceMap: false
		}),
		copy({
			targets: [
				{src: 'src/frontend/**/*.html', dest: 'output/frontend/'}
			]
		}),
		replace({
			preventAssignment: false,
			'process.env.NODE_ENV': '"development"'
		 }),
		resolve(),
		scss({
			fileName: 'style.css',
			outputStyle: 'compressed',
			silenceDeprecations: ['legacy-js-api']
		}),
		terser(),
		typescript({
			outputToFilesystem:true
		})
	]
}
