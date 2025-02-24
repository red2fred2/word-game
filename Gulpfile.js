import { deleteAsync } from 'del';
import { dest, src } from 'gulp';
import minify from 'gulp-minify';
import ts from 'gulp-typescript';

// Clean generated artifacts
export function clean(cb) {
	deleteAsync(['output']);
	cb();
}

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
