var gulp = require('gulp');
var path = require('path');
var shell = require('gulp-shell')
var goPath = 'src/**/*.go';

gulp.task('compilepkg', function() {
	return gulp.src(goPath, {read: false})
		.pipe(shell(['go test ./...', 'go install <%= stripPath(file.path) %>'], {
			templateData: {
				stripPath: function(path) {
					var subPath = path.substring(process.cwd().length + 5);
					var pkg = subPath.substring(0, subPath.lastIndexOf("\\"));
					return pkg;
				}
			}
		}));
});

gulp.task('watch', function() {
	gulp.watch(goPath, ['compilepkg']);
});