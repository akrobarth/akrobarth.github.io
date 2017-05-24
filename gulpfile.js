// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json
var imagemin = require('gulp-imagemin');
var refresh = require('gulp-refresh');
var minify = require('gulp-minify');
var directoryMap = require("gulp-directory-map");

// Variables de chemins
var source = './src'; // dossier de travail
var destination = './dist'; // dossier à livrer

gulp.task('css', function () {
  return gulp.src(source + '/assets/css/styles.less')
    .pipe(plugins.less())
    .pipe(gulp.dest(destination + '/assets/css/'));
});
gulp.task('img', () =>
    gulp.src(source + '/assets/img/*')
        .pipe(imagemin([
		    imagemin.gifsicle({interlaced: true}),
		    imagemin.jpegtran({progressive: true}),
		    imagemin.optipng({optimizationLevel: 5}),
		    imagemin.svgo({plugins: [{removeViewBox: true}]})
		]))
    	.pipe(gulp.dest(destination + '/assets/img/'))
);

gulp.task('compress', function() {
  gulp.src(source + '/assets/js/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        }
    }))
    .pipe(gulp.dest(destination + '/assets/js/'));
});

gulp.task('listpicts', function() {
	gulp.src(source + '/assets/img/*.jpg')
  	.pipe(directoryMap({
    filename: 'images.json'
  }))
  .pipe(gulp.dest(destination + '/assets/js/'));
})

gulp.task('watch', function() {
	//refresh.listen()
    gulp.watch(source + '/assets/css/*.less', ['css']);
    gulp.watch(source + '/assets/js/*.js', ['compress']);
});