const gulp = require("gulp");
const watch = require("gulp-watch");
const rename = require("gulp-rename");
const livereload = require("gulp-livereload");
const cleanCSS = require("gulp-clean-css");
const plumber = require("gulp-plumber");
const htmlMin = require("gulp-htmlmin");
const jsMinify = require("gulp-minify");
const jsonMinify = require("gulp-jsonmin");

gulp.task("html", ()=>{
    livereload.listen();
    return watch("./src/*.html")
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("./"))
        .pipe(livereload(console.log("Watching HTML...")));
});

gulp.task("css", ()=>{
    livereload.listen();
    return watch("./src/css/*.css")
        .pipe(cleanCSS({
            compatibility: "ie8"
        }))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("./assets/css/"))
        .pipe(livereload(console.log("Watching CSS...")));
});

gulp.task("js", ()=>{
    livereload.listen();
    return watch("./src/js/*.js")
        .pipe(plumber())
        .pipe(jsMinify({
            ext: {
                src: "-debug.js",
                min: ".min.js"
            },
            exclude: ["task"],
            noSource: true
        }))
        .pipe(gulp.dest("./assets/js/"))
        .pipe(livereload(console.log("Watching JS...")));
});

gulp.task("minifyJson", ()=>{
    return gulp.src("./src/data/*json")
        .pipe(jsonMinify())
        .pipe(gulp.dest("./assets/data/"));
})

gulp.task("default", gulp.parallel("css", "html", "js"));
gulp.task("json", gulp.parallel("minifyJson"));