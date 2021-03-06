var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync').create()
var imagemin = require('gulp-imagemin')

sass.compiler = require('node-sass');

gulp.task("sass", function () {
  // we want to run "sass css/app.scss app.css --watch"
  return gulp.src("src/css/app.scss")
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(
    cleanCSS({
      compatibility: "ie8"
    })
  )
  .pipe(sourcemaps.write())
  .pipe(gulp.dest("dist"))
  .pipe(browserSync.stream())
})

gulp.task("html", function () {
  return gulp.src("src/*.html")
  // added * so that it can accommodate any page with .html (about/blog,etc.)
  .pipe(gulp.dest("dist"))

})

gulp.task("fonts", function () {
  return gulp.src("src/fonts/*")
  .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function () {
  return gulp.src("src/img/*")
  .pipe(imagemin())
  .pipe(gulp.dest("dist/img"))
})

gulp.task("watch", function () {

  browserSync.init({
    server: {
      baseDir: "dist"
      // "./" just means 'this folder' .. we can use "." too
    }
  })

  gulp.watch("src/*.html", ["html"]).on("change", browserSync.reload)
  gulp.watch("src/css/app.scss",["sass"])
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/img/*", ["images"])
})

gulp.task('default', ["html", "sass", "fonts", "images", "watch"]);
