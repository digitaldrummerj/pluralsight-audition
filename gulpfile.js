var gulp = require("gulp"), 
	 inject = require("gulp-inject"),
	 uglify = require("gulp-uglify"),
	 concat = require("gulp-concat"),
	 del = require("del");

gulp.task("default", function () {
	console.log("Hello Pluralsight");
});

gulp.task("clean", function (cb) {
	del(["./www/js/bundle_min.js"], cb);
});

gulp.task("inject", ["clean"], function () {
	return gulp.src("./www/index.html")
		.pipe(inject(gulp.src(["./www/**/*.js", "!./www/lib/**"], { read: false }), { relative: true }))
		.pipe(gulp.dest("./www/"));
});

gulp.task("release", ["clean"], function () {
	var minJs = gulp.src(["./www/**/*.js", "!./www/lib/**"])
		.pipe(concat("bundle_min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("./www/js/"));

	gulp.src("./www/index.html")
		.pipe(inject(minJs, { relative: true }))
		.pipe(gulp.dest("./www/"));
});

gulp.task("watch", function () {
	gulp.watch([["./www/**/*.js", "!./www/lib/**", "!./www/**/*min*.js"]],
		["inject"]);
});