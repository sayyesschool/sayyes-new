const fs = require("fs");
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const twig = require("gulp-twig");
const cssbeautify = require("gulp-cssbeautify");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");
const del = require("del");

const srcPath = "src/";
const distPath = "dist/";

const path = {
	build: {
		html: distPath,
		js: distPath + "assets/js/",
		css: distPath + "assets/css/",
		images: distPath + "assets/images/",
		fonts: distPath + "assets/fonts/",
	},
	src: {
		html: srcPath + "views/pages/**/*.twig",
		js: srcPath + "assets/js/*.js",
		css: srcPath + "assets/scss/*.scss",
		images:
			srcPath +
			"assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
		fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}",
	},
	watch: {
		html: srcPath + "views/**/*.twig",
		js: srcPath + "assets/js/**/*.js",
		css: srcPath + "assets/scss/**/*.scss",
		images:
			srcPath +
			"assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
		fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}",
	},
	clean: "./" + distPath,
};

function styles() {
	return gulp
		.src(path.src.css)
		.pipe(plumber())
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer())
		.pipe(cssbeautify())
		.pipe(concat("styles.css"))
		.pipe(
			rename({
				suffix: ".min",
				extname: ".css",
			})
		)
		.pipe(gulp.dest(path.build.css))
		.pipe(browserSync.stream());
}

function scripts() {
	return gulp
		.src(path.src.js)
		.pipe(plumber())
		.pipe(concat("scripts.js"))
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js))
		.pipe(browserSync.stream());
}

function images() {
	return gulp
		.src(path.src.images)
		.pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest(path.build.images))
		.pipe(browserSync.stream());
}

function templates() {
	return gulp
		.src(path.src.html)
		.pipe(plumber())
		.pipe(
			twig({
				data: JSON.parse(fs.readFileSync("src/data.json")),
			})
		)
		.pipe(gulp.dest(path.build.html))
		.pipe(browserSync.stream());
}

function serve() {
	browserSync.init({
		server: {
			baseDir: "./dist",
		},
	});

	gulp.watch(path.watch.css, styles);
	gulp.watch(path.watch.js, scripts);
	gulp.watch(path.watch.images, images);
	gulp.watch(path.watch.html, templates);
}

function clean() {
	return del(path.clean);
}

exports.default = gulp.series(
	clean,
	gulp.parallel(styles, scripts, images, templates),
	serve
);

exports.watch = gulp.parallel(styles, scripts, images, templates, serve);
exports.build = gulp.series(
	clean,
	gulp.parallel(styles, scripts, images, templates)
);
