//使用严格模式，否则不能使用es6的语法
'use strict'; 
//引入gulp
const  gulp = require("gulp");
const  webpack = require('gulp-webpack');
const  webpackConfig = require('./webpack.config');

//引入组件
const  autoprefixer = require('gulp-autoprefixer');
const  jshint = require('gulp-jshint');
const  concat = require('gulp-concat');
const  uglify = require('gulp-uglify');
const  rename = require('gulp-rename');
const  cleancss = require('gulp-clean-css');
const  useref = require('gulp-useref');
const  imagemin = require('gulp-imagemin');

//处理css雪碧图
/*gulp.task("spriter",function () {
    gulp.src('./src/css/*.css')
    .pipe(spriter({
        'spriteSheet': './dist/img/images/spritesheet.png',
        'pathToSpriteSheetFromCSS': '../images/spritesheet.png'
    }))
    .pipe(gulp.dest('./dist/css'));
})*/


//合并、压缩css通用文件
gulp.task("concat",function () {
    return gulp.src('./src/css/public/*.css')
    .pipe(concat('common.css'))
    .pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cleancss())
    .pipe(gulp.dest('./dist/css/public'));
})
//处理css一般文件
gulp.task('css',['concat'], function(){
    return gulp.src('./src/css/*.css')
    .pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cleancss())
    .pipe(gulp.dest('./dist/css'));
});

//压缩图片
gulp.task('imagemin',function () {
    gulp.src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img/'))
})
//zepto合并、压缩处理
/*gulp.task('zepto', function() {
    gulp.src('./public/zepto/src/*.js')
    .pipe(concat('zepto.js'))
    .pipe(uglify())
    .pipe(rename('zepto.min.js'))
    .pipe(gulp.dest('./public/zepto/src'))
        
});*/
// 处理js
gulp.task("js",function(){
	gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

//服务
/*gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});*/

//监听文件的变化
gulp.task('watch', function() {
    // 监听image
    gulp.watch('src/img/**/*', function(){
        gulp.run('imagemin');
    });
    // 监听js
    gulp.watch('src/js/**/*.js', function(){
        gulp.run('js');
    });
    // 监听css
    gulp.watch('./src/css/**/*.css', function(){
        gulp.run('css');
    });
});

//默认任务
gulp.task("default",["watch"],function(){
    gulp.start('imagemin','css','js','zepto');
});
