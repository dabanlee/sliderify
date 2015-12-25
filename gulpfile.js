'use strict';

var gulp = require('gulp'),

	// webpack = require('gulp-webpack'),

	sass = require('gulp-sass'),

	sourcemaps = require('gulp-sourcemaps'),

	autoprefixer = require('gulp-autoprefixer'),

	minifycss = require('gulp-minify-css'),

	jshint = require('gulp-jshint'),

	uglify = require('gulp-uglify'),

	imagemin = require('gulp-imagemin'),

	rename = require('gulp-rename'),

	concat = require('gulp-concat'),

	notify = require('gulp-notify'),

	cache = require('gulp-cache'),

	livereload = require('gulp-livereload');

// Styles task
gulp.task('styles', function() {

	// Import file
	return gulp.src('./src/sass/style.scss')

	// .pipe(sourcemaps.init())

	// Compile sass
	.pipe(sass({
		outputStyle: 'expanded'
	}))

	// Add prefix
	.pipe(autoprefixer({
		browsers: ['last 6 versions'],
		cascade: false
	}))

	// Output sourcemaps file to the specified directory
	// .pipe(sourcemaps.write())

	// Output uncompressed file to the specified directory
	.pipe(gulp.dest('./dist/css'))

	// Add '.min' suffix to the file
	.pipe(rename({
		suffix: '.min'
	}))

	// Style file compress
	.pipe(minifycss())

	// Output the compressed file to the specified directory
	.pipe(gulp.dest('./dist/css'))

	// Task completed tips
	.pipe(notify({
		message: 'Styles task completed'
	}));
});

// Scripts
gulp.task('scripts', function() {

	return 	gulp.src('./src/js/*.js')

	.pipe(jshint())

	.pipe(jshint.reporter('default'))

	.pipe(concat('app.js'))

	.pipe(rename({
		suffix: '.min'
	}))

	.pipe(uglify())

	.pipe(gulp.dest('./dist/js'))

	.pipe(notify({
		message: 'Scripts task completed'
	}));
});

// Images
gulp.task('images', function() {

	return gulp.src('./src/img/*')

	.pipe(cache(imagemin({
		optimizationLevel: 3,
		progressive: true,
		interlaced: true
	})))

	.pipe(gulp.dest('./dist/img'))

	.pipe(notify({
		message: 'Images task completed'
	}));
});

// Webpack task
gulp.task('webpack', function() {

	return gulp.src('./src/entry.js')

	.pipe(webpack(require('./webpack.config.js')))

    .pipe(gulp.dest('./dist'))

	// Task completed tips
	.pipe(notify({
		message: 'Webpack task completed'
	}));
});

// Default task
gulp.task('default', function() {
	gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('./src/sass/*.scss', ['styles']);

	// Watch .js files, webpack --watch
	gulp.watch('./src/**/*.js', ['scripts']);

	// Watch image files
	gulp.watch('./src/img/*', ['images']);

	// Create LiveReload server
	livereload.listen();

	// Watch any files in dist/, reload on change
	gulp.watch(['./dist/*']).on('change', livereload.changed);
});