const gulp = require("gulp");
const pug = require("gulp-pug");

let src = {
  dev: {
    pug: "app/dev/pug/*.pug",
  },
  prod: {
    html: "app/prod/",
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
