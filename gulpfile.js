let gulp = require('gulp'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass')(require('sass')),
    del = require('del'),
	ts = require('gulp-typescript');

sass.compiler = require('node-sass');


let path = {
	src: {
		html: `src/*.html`,            // [.html]
		css: `src/css/**/*.css`,       // [.css]
		scss: `src/scss/**/*.scss`,    // [.sass, .scss]
		img: `src/img/**/*.*`,         // [.png, .jpg, .jpeg, .svg]
		fonts: `src/fonts/**/*.*`,     // [.ttf, .eot, .woff]
		js: `src/js/**/*.js`,          // [.js]
		ts: `src/ts/**/*.ts`,			// [.ts]
	},
	build: {
		html: `build/`,
		css: `build/css/`,
		scss: `build/css/`,
		img: `build/img/`,
		fonts: `build/fonts/`,
		js: `build/js/`,
		ts: `build/js/`,
	},
    watch: {
        html: `watch/`,
		css: `watch/css/`,
		scss: `watch/css/`,
		img: `watch/img/`,
		fonts: `watch/fonts/`,
		js: `watch/js/`,
		ts: `watch/js/`,
    }
}


gulp.task('build', function(done) {
	console.log('Началась сборка проекта...');

    del.sync([path.build.html, path.build.css, path.build.js, path.build.img, path.build.fonts]);
    console.log("Очищена папка build");

	gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html));
	console.log("HTML файлы перенесены в папку build");

	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));
	console.log("Шрифты перенесены в папку build/fonts/");

	gulp.src(path.src.img)
		.pipe(gulp.dest(path.build.img));
	console.log("Картинки перенесены в папку build/img/");

	gulp.src(path.src.js)
		.pipe(concat('script.js')) // объединие всех файлов Скриптов в один script.js
		.pipe(gulp.dest(path.build.js));
	console.log("JS скрипты объединены в один файл script.js и перенесены в папку build/js/");

	gulp.src(path.src.ts)
		.pipe(gulp.dest(path.build.ts));
	console.log("TypeScript файлы обработаны и перенесены в папку build/js/");

	gulp.src(path.src.css)
        .pipe(gulp.dest(path.build.css));
    console.log("CSS стили перенесены в папку build/css/");

    gulp.src(path.src.scss)
        .pipe(sass())
		.pipe(concat('style.css'))
        .pipe(gulp.dest(path.build.scss));
    console.log("SCSS стили преобразованы в CSS и перенесены в папку build/css/");
	
	console.log('Cборка проекта закончена.');
	done();
});



gulp.task('whtml', function() {
	return gulp.src(path.src.html)
		.pipe(gulp.dest(path.watch.html))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('wjs', function() {
	return gulp.src(path.src.js)
		.pipe(gulp.dest(path.watch.js))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('wts', function() {
	return gulp.src(path.src.ts)
		.pipe(
			ts({
				declaration: true
			})
		)
		.pipe(gulp.dest(path.watch.ts))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('wimg', function() {
	return gulp.src(path.src.img)
		.pipe(gulp.dest(path.watch.img))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('wfonts', function() {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.watch.fonts))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('wcss', function () {
    return gulp.src(path.src.css)
        .pipe(gulp.dest(path.watch.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('wscss', function () {
    return gulp.src(path.src.scss)
        .pipe(sass().on('error', notify.onError({
           message  : "<%= error.message %>",
           title    : "Scss Error!"
        })))
		.pipe(concat('style.css'))
        .pipe(gulp.dest(path.watch.scss))
        .pipe(notify('SCSS - хорошая работа!'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'watch'
		},
		notify: false
	});
});

gulp.task('watch', function(){
    del.sync([path.watch.html, path.watch.css, path.watch.js, path.watch.ts, path.watch.img, path.watch.fonts]);
    console.log("Очищена папка watch");
	gulp.watch(path.src.html, gulp.parallel('whtml'));
	gulp.watch(path.src.css, gulp.parallel('wcss'));
    gulp.watch(path.src.scss, gulp.parallel('wscss'));
	gulp.watch(path.src.js, gulp.parallel('wjs'));
	gulp.watch(path.src.ts, gulp.parallel('wts'));
	gulp.watch(path.src.img, gulp.parallel('wimg'));
	gulp.watch(path.src.fonts, gulp.parallel('wfonts'));
});

gulp.task('default', gulp.parallel('whtml', 'wjs', 'wts', 'wimg', 'wfonts', 'wcss', 'wscss', 'browser-sync', 'watch'));