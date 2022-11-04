const gulp=require('gulp');
const ugly=require('gulp-uglify');
var jshint=require('gulp-jshint');   //useful for debugging js files
var changed=require('gulp-changed');
var plumber=require('gulp-plumber'); //Complete all the task and prevents gulp tasks from stopping if there are any errors
var minCSS=require('gulp-clean-css')

var SRC='script.js'
var DES='js'

//Update only the changed js files
gulp.task('changed',function(){
  return gulp.src(SRC)
  .pipe(changed(DES))
  .pipe(gulp.dest(DES))
})

//kind of realtime debugger function
gulp.task('jshint',function(){
  gulp.src(SRC) 
  .pipe('plumber')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
});

//minify js file 
gulp.task('minify',async function(){
  gulp.src(SRC)
      .pipe(ugly())
      .pipe(gulp.dest(DES))
});

//minify css 
gulp.task('cleancss',function(){
  return gulp.src('style.css')
  .pipe(minCSS())
  .pipe(gulp.dest('css'))
});

//watch task-executes without command
gulp.task('watch',function(){
  gulp.watch(SRC,gulp.series('changed'));
});

gulp.task('default',gulp.series('watch','jshint'));  //runs all task one time only
