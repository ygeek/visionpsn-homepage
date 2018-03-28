var gulp = require('gulp'),
    assetRev = require('gulp-asset-rev'),
    runSequence = require('run-sequence'),
    rev = require('gulp-rev'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    revCollector = require('gulp-rev-collector'),
    cleanCSS = require('gulp-clean-css');

var cssSrc = 'dist/css/*.css',
    jsSrc = 'dist/js/*.js';

gulp.task('cleanDist', function () {
    return gulp.src(['dist','rev'], {read: false})
    .pipe(clean());
});

gulp.task('copy',  function() {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist'))
});

gulp.task('assetRev', function(){
    return gulp.src(cssSrc)
      .pipe(assetRev())
      .pipe(gulp.dest('dist/css'));
});

gulp.task('revCss', function(){
    return gulp.src(cssSrc)
    .pipe(rev())
    // 压缩css
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'));
});


gulp.task('revJs', function(){

    return gulp.src(jsSrc)
    .pipe(rev())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js'));



 });


gulp.task('revHtml', function () {
    return gulp.src(['rev/**/*.json', 'src/**/*.html'])
    .pipe(revCollector({
        replaceReved: true
    }))
    .pipe(gulp.dest('dist'));
});


//开发构建
gulp.task('default', function (done) {
    condition = false;
    runSequence(
        ['cleanDist'],
        // ['copy'],
        // ['assetRev'],
        ['revCss'],
        ['revJs'],
        ['revHtml'],
        done);
});
