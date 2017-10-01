'use strict';
// ---------packages
var gulp                 = require('gulp'),
    path                 = require('path'),
    fs                   = require('fs'),
    browserSync          = require("browser-sync"),
    reload               = browserSync.reload,
    plumber              = require('gulp-plumber'),
    // pug                  = require('gulp-pug'),
    // pugInheritance       = require('gulp-pug-inheritance'),
    jadeInheritance      = require('gulp-jade-inheritance'),
    jade                 = require('gulp-jade'),
    changed              = require('gulp-changed'),
    cached               = require('gulp-cached'),
    gulpif               = require('gulp-if'),
    gutil                = require('gulp-util'),
    filter               = require('gulp-filter'),
    notifier             = require('node-notifier'),
    // less                 = require('gulp-less'),
    // LessAutoprefix       = require('less-plugin-autoprefix'),
    sassAutoprefixer     = require('gulp-autoprefixer'),
    sass                 = require('gulp-sass'),
    sourcemaps           = require('gulp-sourcemaps'),
    es                   = require('event-stream'),
    flatten              = require('gulp-flatten'),
    runSequence          = require('gulp-run-sequence'),
    
    imagemin             = require('gulp-imagemin'),
    imageminJpegtran     = require('imagemin-jpegtran'),
    pngquant             = require('imagemin-pngquant'),
    imageminOptipng      = require('imagemin-optipng'),
    file                 = require('gulp-file'),
    insert               = require('gulp-insert'),
    spritesmith          = require('gulp.spritesmith');

// ---------paths
var route = {
    main:  {},
    src:   {},
    build: {},
    watch: {},
    clean: {},
}
// main paths
route.main.src             = 'dev/';
route.main.build           = 'dist/';
route.main.assets          = route.main.build    + 's/';
// search develop files
route.src.pug              = route.main.src      + 'templates/';
route.src.pugFiles         = route.src.pug       + '**/*.jade';
route.src.js               = route.main.src      + 'js/';
route.src.jsFiles          = route.src.js        + '**/*.js';
route.src.componentsJs     = route.src.pug       + '_includes/components/**/*.js';
// route.src.styles           = route.main.src      + 'less/';
route.src.styles           = route.main.src      + 'sass/';
// route.src.stylesFiles      = route.src.styles    + '**/*.less';
route.src.stylesFiles      = route.src.styles    + '**/*.scss';
// route.src.componentsStyles = route.src.pug       + '_includes/components/**/*.less';
route.src.componentsStyles = route.src.pug       + '_includes/components/**/*.scss';
route.src.images           = route.main.src      + 'images/';
route.src.imagesFiles      = route.src.images    + '**/*.*';
route.src.videos           = route.main.src      + 'videos/**/*.*';
route.src.fonts            = route.main.src      + 'fonts/**/*.*';
// watch develop files
route.watch.pugFiles       = route.src.pugFiles;
route.watch.styles         = route.src.stylesFiles;
route.watch.js             = route.src.jsFiles;
route.watch.images         = route.src.imagesFiles;
route.watch.videos         = route.src.videos;
route.watch.fonts          = route.src.fonts;
// build develop files
route.build.styles            = route.main.assets + 'css/';
route.build.js                = route.main.assets + 'js/';
route.build.js_components     = route.src.styles  + 'components/';
route.build.style_components  = route.src.styles  + '_includes/components/cash/';
route.build.images            = route.main.assets + 'images/';
route.build.videos            = route.main.assets + 'videos/';
route.build.fonts             = route.main.assets + 'fonts/';

// ---------server
var config = {
    server: {
        baseDir: route.main.build
    },
    host: 'localhost',
    port: 9000,
    reloadDelay: 0,
    open: true
};
gulp.task('webserver', function() {
    browserSync(config);
});

// ---------plumber
// error function for plumber
var onError = function (err) { 
  gutil.beep();
  notifier.notify({
      title: 'Something is Wrong!'
  })
  console.log(err.toString());
  this.emit('end');
};
global.isWatching = true;
gulp.task('setWatch', function() {
    global.isWatching = true;
});
// ---------build tasks

gulp.task('html:build', function() {
    return gulp.src(route.src.pugFiles)
    .pipe(plumber({
      errorHandler: onError
    }))

    //only pass unchanged *main* files and *all* the partials
    .pipe(changed('dist', {extension: '.html'}))

    //filter out unchanged partials, but it only works when watching
    .pipe(gulpif(global.isWatching, cached('jade')))

    //find files that depend on the files that have changed
    .pipe(jadeInheritance({basedir: route.src.pug}))

    //filter out partials (folders and files starting with "_" )
    .pipe(filter(function (file) {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    //process jade templates
    // .pipe(plumber({ errorHandler: onError }))
    .pipe(jade({
      pretty: true
    }))
    // concat links, scripts in one publish file without minification
    // .pipe(useref({ searchPath: 'www/' }))
    //save all the files
    .pipe(gulp.dest(route.main.build))
    .on('end', browserSync.reload);
});

// var lessSourceFilesBasePath = path.join('dev', 'less')
// var lessSourceFiles = path.join(fs.realpathSync(lessSourceFilesBasePath), '*.less')
// var autoprefix = new LessAutoprefix({ browsers: ["> 0%"] });

// gulp.task('style:gen', function(callback) {
//     var cssDestination = path.dirname(lessSourceFiles)

//     return gulp
//         .src(lessSourceFiles)
//         .pipe(plumber({
//             errorHandler: onError
//         }))
//         .pipe(changed(cssDestination, { extension: '.css' }))
//         .pipe(sourcemaps.init())
//         .pipe(
//             less({
//                 plugins: [autoprefix]
//             })
//         )
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(route.build.styles))
//         .on('end', browserSync.reload);
// });

var sassSourceFilesBasePath = path.join('dev', 'sass')
var sassSourceFiles = path.join(fs.realpathSync(sassSourceFilesBasePath), '*.scss')
var autoprefix = new sassAutoprefixer({ browsers: ["> 0%"], cascade: false});

gulp.task('style:gen', function(callback) {
    var cssDestination = path.dirname(sassSourceFiles)

    return gulp
        .src(sassSourceFiles)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(changed(cssDestination, { extension: '.css' }))
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                plugins: [autoprefix]
            })
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(route.build.styles))
        .on('end', browserSync.reload);
});

gulp.task('style_components:replace', function(callback) {

    gulp.src(route.src.componentsStyles)
        .pipe(plumber())
        .pipe(flatten({ includeParents: 0}))
        .pipe(gulp.dest(route.build.style_components))
        .on('end', function(){
           callback();
        });
});

gulp.task('style:build', function(cb) {
    runSequence('style_components:replace', 'style:gen', cb);
});
gulp.task('js_components:replace', function() {
    gulp.src(route.src.componentsJs)
        .pipe(plumber())
        .pipe(flatten({ includeParents: 0}))
        .pipe(gulp.dest(route.build.js_components))
        .on('end', browserSync.reload);
});

gulp.task('js:build', ['js_components:replace'], function() {
    gulp.src(route.src.jsFiles)
        .pipe(plumber())
        .pipe(gulp.dest(route.build.js))
        .on('end', browserSync.reload)
});

gulp.task('fonts:build', function() {
    gulp.src(route.src.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(route.build.fonts));
});
gulp.task('images:build', function() {
    gulp.src(route.src.imagesFiles)
        .pipe(plumber())
        .pipe(gulp.dest(route.build.images));
});

/*===================================
=            spritesmith            =
===================================*/
/*
gulp.task('sprite:build', function () {
  var spriteData = gulp.src('./dev/images/useful/sprites/theme/not-render/*.*').pipe(
    spritesmith({
      imgName: 'theme-sprite.png',
      cssName: 'theme-sprite.less',
      imgPath: '../images/useful/sprites/theme/theme-sprite.png',
      algorithm: 'binary-tree',
      padding: 2,
      sort: false
    })
  )
  return spriteData.pipe(gulp.dest('./dist/s/images/useful/sprites/theme/'));
});
*/

gulp.task('sprite:build', function () {
  var spriteData = gulp.src('./dev/images/useful/sprites/theme/not-render/*.*').pipe(
    spritesmith({
      imgName: 'theme-sprite.png',
      cssName: 'theme-sprite.scss',
      imgPath: '../images/useful/sprites/theme/theme-sprite.png',
      algorithm: 'binary-tree',
      padding: 2,
      sort: false
    })
  )
  return spriteData.pipe(gulp.dest('./dist/s/images/useful/sprites/theme/'));
});

/*=====  End of spritesmith  ======*/

gulp.task('videos:build', function() {
    gulp.src(route.src.videos)
        .pipe(plumber())
        .pipe(gulp.dest(route.build.videos));
});

// ---------watch tasks
gulp.task('build', [
    'html:build',
    'style:build',
    'js_components:replace',
    'js:build',
    'fonts:build',
    'images:build',
    'videos:build'
]);

gulp.task('watch', ['setWatch'], function() {
    gulp.watch(route.watch.pugFiles,       ['html:build'] );
    gulp.watch(route.src.componentsStyles, ['style:build']);
    gulp.watch(route.watch.styles,         ['style:build']);
    gulp.watch(route.src.componentsJs,     ['js_components:replace']);
    gulp.watch(route.watch.js,             ['js:build']   );
    gulp.watch(route.src.imagesFiles,      ['images:build']);
    gulp.watch(route.watch.fonts,          ['fonts:build']);
});
gulp.task('default', ['build', 'webserver', 'watch']);

// COMPONENT=<new_component_name> gulp create
var component_name = process.env.COMPONENT; 
gulp.task('create', function(){
    var components_dest = 'dev/templates/_includes/components/' + component_name + '/';
    var sass_str = '.' + component_name + ' {}';
    var jade_str = 'mixin ' + component_name + '(data)\n\t.' + component_name;

    fs.stat(components_dest + component_name + '.jade', function(err, stat) {
        if(err == null) {
            console.error('ERROR: ' + component_name + '.jade' + ' in already exist');
        } else {
            fs.stat(components_dest + component_name + '.scss', function(err, stat) {
                if(err == null) {
                    console.error('ERROR: ' + component_name + '.scss' + ' in already exist');
                } else {
                    file(component_name + '.scss', sass_str)
                        .pipe(gulp.dest(components_dest));
                    file(component_name + '.jade', jade_str)
                        .pipe(gulp.dest(components_dest));
                    gulp.src('dev/sass/_includes/components/index.scss')
                        .pipe(insert.append('\n@import "./cash/' + component_name + '";'))
                        .pipe(gulp.dest('dev/sass/_includes/components/'));
                };
            });
        };
    });
    return true;
});
// COMPONENT=<new_component_name> gulp create-jade
gulp.task('create-jade', function(){
    var components_dest = 'dev/templates/_includes/components/' + component_name + '/';
    var jade_str = 'mixin ' + component_name + '(data)\n\t.' + component_name;

    fs.stat(components_dest + component_name + '.jade', function(err, stat) {
        if(err == null) {
            console.error('ERROR: ' + component_name + '.jade' + ' in already exist');
        } else {
            file(component_name + '.jade', jade_str)
                .pipe(gulp.dest(components_dest));
        };
    });
    return true;
});
// COMPONENT=<new_component_name> gulp create-sass
gulp.task('create-less', function(){
    var components_dest = 'dev/templates/_includes/components/' + component_name + '/';
    var sass_str = '.' + component_name + ' {}';
    fs.stat(components_dest + component_name + '.scss', function(err, stat) {
        if(err == null) {
            console.error('ERROR: ' + component_name + '.scss' + ' in already exist');
        } else {
            file(component_name + '.scss', sass_str)
                .pipe(gulp.dest(components_dest));
            gulp.src('dev/sass/_includes/components/index.scss')
                .pipe(insert.append('\n@import "./cash/' + component_name + '";'))
                .pipe(gulp.dest('dev/sass/_includes/components/'));
        };
    });
    return true;
});