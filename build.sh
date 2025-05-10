#! /bin/sh

# Build webassembly
wasm-pack build --target web

# Build back end code
node node_modules/gulp-cli/bin/gulp.js &

# Build front end code
node node_modules/rolldown/bin/cli.js -c &

wait

cp pkg/*.wasm output/frontend/
