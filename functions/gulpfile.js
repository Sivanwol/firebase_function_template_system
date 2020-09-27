const gulp = require('gulp');
const yamlinc = require("gulp-yaml-include");
const clean = require("gulp-clean");
const yamlMerge = require('gulp-yaml-merge');
const pathExists = require('path-exists');
const { argv } = require('yargs');
const gulpIf = require('gulp-if');
const through2 = require('through2');
const yaml = require('gulp-yaml');
const rename = require("gulp-rename");
const fs = require('fs');

gulp.task("compile:config:buildYaml", function () {
    return gulp.src("./config/application.yml")
        .pipe(yamlinc())
        .pipe(gulp.dest('./.tmp'))
        .pipe(gulp.src(`config/env/${argv.env || 'default'}.yml`))
        .pipe(yamlMerge('.tmp/application.yml'))
        .pipe(gulp.dest('./'))
})


gulp.task("compile:config:buildJson", function () {
    return gulp.src('.tmp/application.yml')
        .pipe(yaml({ safe: true, json: true }))
        .pipe(gulp.dest('.tmp'))
})

gulp.task("compile:config:moveJson", function () {
    return gulp.src('.tmp/application.json')
        .pipe(rename(".runtimeconfig.json"))
        .pipe(gulp.dest('./'))
})

gulp.task("compile:config:clean", function () {
    return gulp.src('.tmp', { read: false })
        .pipe(clean())
})

gulp.task("compile:config:preconfig", function () {
    const dir = './.tmp';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    return gulp.src("./config/application.yml")
});
gulp.task('compile:config', gulp.series(
    'compile:config:preconfig', 
    'compile:config:buildYaml', 
    'compile:config:buildJson',
    'compile:config:moveJson' ,
    'compile:config:clean'
));
gulp.task('default', gulp.series('compile:config'));