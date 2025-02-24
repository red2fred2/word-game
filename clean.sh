#! /bin/sh

# Run gulp clean
node node_modules/gulp-cli/bin/gulp.js clean

# Delete node modules
rm -rf node_modules/
