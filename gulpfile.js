//使用严格模式，否则不能使用es6的语法
'use strict'; 
//引入gulp
const  gulp = require("gulp");
const  webpack = require('gulp-webpack');
const  webpackConfig = require('./webpack.config');

//引入组件
const  autoprefixer = require('gulp-autoprefixer');
const  jshint = require('gulp-jshint');
const  sass = require('gulp-sass');
const  concat = require('gulp-concat');
const  uglify = require('gulp-uglify');
const  rename = require('gulp-rename');
const  cleanCSS = require('gulp-clean-css');
const  spriter = require('gulp-css-spriter');

//处理css雪碧图
gulp.task("spriter",function () {
    gulp.src('./src/css/*.css')
    pipe(spriter({
        'spriteSheet': './dist/img/images/spritesheet.png',
        'pathToSpriteSheetFromCSS': '../images/spritesheet.png'
    }))
    .pipe(gulp.dest('./dist/css'));
})
//处理css一般文件
gulp.task('css',['concat'], function(){
    gulp.src(['./src/css/reset.css'],['./src/css/public.css'],['./src/css/globle.css'])
    .pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'));
});
//压缩css通用文件
gulp.task("concat",function () {
    gulp.src(['./src/css/public/*.css'])
    .pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css/public'));
})
//压缩图片
gulp.task('imagemin',function () {
    gulp.src('./src.img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img/'))
})
//检查js
gulp.task('jshint', function() {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//压缩JS
gulp.task("min-js",['jshint'],function(){
	gulp.src('./src/js/*.js')
        // .pipe(concat('all.js'))
        // .pipe(gulp.dest('./dist/js'))
        // .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

//监听文件的变化
gulp.task('watch', function() {
    // gulp.watch('src/less/*.less', ['cleanCSS']);
    gulp.watch('src/js/*.js', ['min-js']);
    gulp.watch('./src/css/**/*.css', ['css']);
});

//默认任务
gulp.task("default",["watch","css","min-js"]);
