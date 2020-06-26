const gulp = require("gulp");
const pug = require("gulp-pug");
const concat = require("gulp-concat");
// const rename = require("gulp-rename");
// const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass");

let src = {
  dev: {
    pug: "app/dev/pug/*.pug",
    sass: "app/dev/sass/*.sass",
    js: "app/dev/js/*.js",
  },
  prod: {
    html: "app/prod/",
    css: "app/prod/css/",
    js: "app/prod/js/",
  },
};

gulp.task("pug", function () {
  return gulp
    .src(src.dev.pug)
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest(src.prod.html));
});

gulp.task("sass", function () {
  return gulp
    .src(src.dev.sass)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(src.prod.css));
});

gulp.task("scripts", function () {
  return gulp
    .src(src.dev.js)
    .pipe(concat("index.js"))
    .pipe(gulp.dest(src.prod.css));
});

gulp.task("autopre", function () {
  return gulp
    .src(src.dev.sass)
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest(src.prod.css));
});
