var gulp = require('gulp')
var browser = require('browser-sync')
var cp = require('child_process')

var port = process.env.SERVER_PORT || 8080

gulp.task('build', async function() {
  // index
  gulp.src("./src/index.html")
    .pipe(gulp.dest("./build/"))

  // assets
  gulp.src("./src/assets/js/index.js")
    .pipe(gulp.dest("./build/assets/js"))
  gulp.src("./src/assets/js/components/*.js")
    .pipe(gulp.dest("./build/assets/js/components"))
  gulp.src("./src/assets/js/filters/*.js")
    .pipe(gulp.dest("./build/assets/js/filters"))
  gulp.src("./src/assets/js/mixins/*.js")
    .pipe(gulp.dest("./build/assets/js/mixins"))
})

gulp.task('browser', gulp.series('build', function() {
  browser.init({ server: './build', port: port })

  gulp.watch(["./src/**/*.html", "./src/**/*.js"], gulp.series('build'))
  gulp.watch(["./build/**/*.html", "./build/**/*.js"]).on('change', browser.reload)
}))

gulp.task("default", gulp.series('build', 'browser'))

