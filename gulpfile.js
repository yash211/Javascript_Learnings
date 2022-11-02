const gulp=require('gulp');
const ugly=require('gulp-uglify');

gulp.task('minify',async function(){
  gulp.src('script.js')
      .pipe(ugly())
      .pipe(gulp.dest('js'))
});

