//引入gulp
var gulp = require("gulp");

// gulp.task("copy-html", function(){
// 	return gulp.src("index.html")
// 	.pipe(gulp.dest("dist"))

// })
// 拷贝html
gulp.task("html",function(){
	return gulp.src("*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})

// 拷贝图片
gulp.task("images",function(){
	return gulp.src("images/**/*")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload());
})

// 拷贝css
// var minifyCSS = require("gulp-minify-css");
// var rename = require("gulp-rename");


gulp.task("css",function(){
	return gulp.src("css/**/*")
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

// gulp.task("indexCSS",function(){
// 	return gulp.src("css/index.css")
// 	.pipe(gulp.dest("dist/css"))
// 	.pipe(minifyCSS())
// 	.pipe(rename("index.min.css"))
// 	.pipe(gulp.dest("dist/css"))
// 	.pipe(connect.reload());
// })


// 拷贝js
gulp.task("js",function(){
	return gulp.src("js/**/*")
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})

// 拷贝php
gulp.task("php",function(){
	return gulp.src("php/*.php")
	.pipe(gulp.dest("dist/php"))
	.pipe(connect.reload());
})

// 拷贝fonts
gulp.task("fonts",function(){
	return gulp.src("fonts/**/*")
	.pipe(gulp.dest("dist/fonts"))
	.pipe(connect.reload());
})


// watch
gulp.task("watch",function(){

	gulp.watch("*.html",["html"]);
	gulp.watch("images/**/*",["images"]);
	gulp.watch("css/*.css",["css"]);
	gulp.watch("js/**/*",["js"]);
	gulp.watch("php/*.php",["php"]);
	gulp.watch("fonts/**/*",["fonts"]);

	//监听sass
	gulp.watch("css/index.scss",["sass_index"]);
	gulp.watch("css/signin.scss",["sass_signin"]);
	gulp.watch("css/register.scss",["sass_register"]);
	gulp.watch("css/details.scss",["sass_details"]);
	gulp.watch("css/shoppingcart.scss",["sass_shoppingcart"]);
})









//sass
var sass = require("gulp-sass-china");
gulp.task("sass_index",function(){
	return gulp.src("css/index.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

gulp.task("sass_signin",function(){
	return gulp.src("css/signin.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

gulp.task("sass_register",function(){
	return gulp.src("css/register.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

gulp.task("sass_details",function(){
	return gulp.src("css/details.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

gulp.task("sass_shoppingcart",function(){
	return gulp.src("css/shoppingcart.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})



// 全部的任务
gulp.task("bulid",['sass_shoppingcart','sass_details','sass_register','sass_index','sass_signin','images',
	'js','fonts','php','html','css'])


// connect（服务器）
var connect = require("gulp-connect");
gulp.task("server",function(){
	connect.server({
		root:'dist',
		port:9090,
		livereload:true
	})
})






// 默认任务
gulp.task("default",["watch","server"],function(){});