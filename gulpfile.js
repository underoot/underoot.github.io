'use strict';

const gulp    = require('gulp');
const pug     = require('gulp-pug');
const csso    = require('gulp-csso');
const del     = require('del');
const bs      = require('browser-sync').create();
const sitemap = require('gulp-sitemap');
const gulpif  = require('gulp-if');

const env = process.env.NODE_ENV;
const prod = env === 'production';

gulp.task('pages', gulp.series(
	() => {
		return gulp.src([
			'src/**/*.pug',
			'!src/ru.pug',
			'!src/_base/**/*.pug'
		])
			.pipe(pug({
				data: {
					process: {
						env: process.env
					}
				}
			}))
			.pipe(gulp.dest('./dist'));
	},
	() => {
		return gulp.src('./dist/**/*.html')
			.pipe(gulpif(prod, sitemap({
				siteUrl: 'https://underoot.ru'
			})))
			.pipe(gulp.dest('./dist'));
			
	})
);;

gulp.task('public', () => {
	return gulp.src('public/**/*')
		.pipe(gulp.dest('./dist'));
});

gulp.task('styles', () => {
	return gulp.src('src/**/*.css')
		.pipe(gulpif(prod, csso()))
		.pipe(gulp.dest('./dist'))
		.pipe(bs.stream());
});

gulp.task('clean', (cb) => {
	return del(['dist/'], cb);
});

gulp.task('build', gulp.parallel(
	'pages',
	'public',
	'styles'
));

gulp.task('watch', () => {
	bs.init({
		notify: false,
		open: false,
		server: {
			baseDir: './dist'
		}
	});

	gulp.watch('src/**/*.pug', gulp.series('pages'));
	gulp.watch('src/**/*.css', gulp.series('styles'));
	gulp.watch('dist/*.html').on('change', bs.reload);
});

gulp.task('default', gulp.series(
	'clean',
	'build'
));

gulp.task('serve', gulp.series(
	'default',
	'watch'
));
