import { dest, src } from 'gulp';
import minify from 'gulp-minify';
import ts from 'gulp-typescript';

// Build typescript
const tsProject = ts.createProject('tsconfig.json');

export function typescript(cb) {
	src('src/backend/**/*.ts')
		.pipe(tsProject())
		.pipe(minify({
			ext:{min: '.js'},
			noSource: true
		}))
		.pipe(dest('output/backend/'));
	cb();
}

export default typescript;
