/// <binding BeforeBuild='inject' />
var gulp = require("gulp"),
	concat = require("gulp-concat"),
	inject = require("gulp-inject"),
	sourcemaps = require("gulp-sourcemaps"),
	del = require("del"),
	uglify = require("gulp-uglify"),
	ngAnnotate = require('gulp-ng-annotate');

gulp.task("default", [], function () {
	console.log("Hello Pluralsight");
});

gulp.task("watch", function () {
	gulp.watch([
		[
			"./www/**/*.js", 
			"!./www/lib/**", 
			"!./www/**/*min*.js"
		],
		[
			"./www/**/*.css", 
			"!./www/css/ionic.app*.css", 
			"!./www/lib/**"
		]
	], ["inject"]);
});

gulp.task("inject", function () {
	return gulp.src("./www/index.html")
		.pipe(
			inject(
				gulp.src(
					["./www/**/*.js", 
					"!./www/lib/**", 
					"!./www/**/*min*.js"
					], { read: false }
				), { relative: true }))
		.pipe(
			inject(
				gulp.src(
					["./www/**/*.css", 
					"!./www/css/ionic.app*.css", 
					"!./www/lib/**"
					], { read: false }
				), { relative: true }))
		.pipe(gulp.dest("./www/"));

});

gulp.task("clean", function (cb) {
	del(["./www/js/bundle_min.js"], cb);
});

gulp.task("release", ["clean"], function () {
	var minJs = gulp.src(
			["./www/**/*.js", 
			"!./www/lib/**", 
			"!./www/**/*min*.js"]
		)
		.pipe(sourcemaps.init())
		.pipe(concat("bundle_min.js"))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("./www/js/"));

	gulp.src("./www/index.html")
		.pipe(inject(minJs, { relative: true }))
		.pipe(gulp.dest("./www/"));
});