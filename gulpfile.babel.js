const
      babelify        = require('babelify'),
      browserSync     = require('browser-sync').create(),
      browserify      = require('browserify'),
      buffer          = require('vinyl-buffer'),
      cache           = require('gulp-cache'),
      defmod          = require('gulp-define-module'),
      del             = require('del'),
      gulp            = require('gulp'),
      imagemin        = require('gulp-imagemin'),
      minify          = require('gulp-minify'),
      plumber         = require('gulp-plumber'),
      rename          = require('gulp-rename'),
      runSequence     = require('run-sequence'),
      size            = require('gulp-size'),
      source          = require('vinyl-source-stream'),
      watch           = require('gulp-watch'),
      config = {
          name: 'contrechess',
          fileTypes: {
            all: '**/*',
            html: '**/*.html',
            css: '**/*.css',
            images: '**/*.+(png|jpg|jpeg|gif|svg)',
            js: 'js/**/*.js',
            contracts: 'builds/contracts/*.json',
            main: 'main.js'
          },
          baseDir: {
            source: 'src',
            staging : 'staging',
            distribution: 'dist'
          }
        }

gulp.task('clean', function (callback) {
  runSequence('clean:dist', 'clean:stage', callback)
})

gulp.task('clean:stage', function () {
  let stagingDir = `${config.baseDir.staging}/${config.fileTypes.all}`
  return del.sync(stagingDir)
})

gulp.task('clean:dist', function () {
  let distributionDir = `${config.baseDir.distribution}/${config.fileTypes.all}`
  return del.sync(distributionDir)
})

gulp.task('stage:contracts', function () {
  let sourceDir  = config.fileTypes.contracts,
      stagingDir = config.baseDir.staging
  return gulp.src(sourceDir)
  .pipe(gulp.dest(stagingDir))
})

gulp.task('stage:javascript', function () {
  let sourceDir  = `${config.baseDir.source}/${config.fileTypes.js}`,
      stagingDir = config.baseDir.staging
  return gulp.src(sourceDir)
  .pipe(gulp.dest(stagingDir))
})

gulp.task('stage:images', function () {
  let sourceDir  = `${config.baseDir.source}/${config.fileTypes.images}`,
      distributionDir = config.baseDir.distribution
  return gulp.src(sourceDir)
    // caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest(distributionDir))
})
    
gulp.task('stage:html', function () {
  let htmlFiles = `${config.baseDir.source}/${config.fileTypes.html}`
  return gulp.src(htmlFiles)
  .pipe(gulp.dest(config.baseDir.distribution))
})

gulp.task('stage:css', function () {
  let cssFiles = `${config.baseDir.source}/${config.fileTypes.css}`
  return gulp.src(cssFiles)
  .pipe(gulp.dest(config.baseDir.distribution))
})

gulp.task('bundle', ['stage:javascript', 'stage:contracts'], function () {
  let mainFile = `${config.baseDir.staging}/${config.fileTypes.main}`
  return browserify(mainFile)
      .transform('browserify-css', {
        minify: true,
        output: config.name + '.css'
      })
      .transform(babelify, {
        presets: ['env', 'react'],
        plugins: ['react-html-attrs', 'transform-class-properties' /*, 'browserify-css'*/ ]
        })
      .bundle()
    .pipe(plumber())
    .pipe(source(config.name + '.js'))
    .pipe(buffer())
    .pipe(minify())
    .pipe(size())
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.baseDir.distribution))
})

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'clean:stage', ['stage:html', 'stage:css', 'stage:images', 'bundle'],
    callback)
})

gulp.task('browser-sync', ['build'], function () {
  browserSync.init({
    server: {
      baseDir: './dist',
    }
  })
})
 
gulp.task('default', ['browser-sync'], function () {
  let jsFiles = `${config.baseDir.distribution}/${config.fileTypes.js}`
  return watch(jsFiles, browserSync.reload)
})

