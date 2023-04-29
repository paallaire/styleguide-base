'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');

/*
 * Configure a Fractal instance.
 *
 * This configuration could also be done in a separate file, provided that this file
 * then imported the configured fractal instance from it to work with in your Gulp tasks.
 * i.e. const fractal = require('./my-fractal-config-file');
 */

const fractal = require('@frctl/fractal').create();

/* loading twig */
const twigAdapter = require('@frctl/twig')();
fractal.components.engine(twigAdapter);
fractal.components.set('ext', '.twig');

/* Set the title of the project */
fractal.set('project.title', 'Styleguide Base');

/* Tell Fractal where the components will live */
fractal.components.set('path', __dirname + '/styleguide/components');

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', __dirname + '/styleguide/docs');

/* destination for the static export */
fractal.web.set('builder.dest', 'docs');

/* Hard-code a port number to start the server on. */
fractal.web.set('server.port', 4000);

/* Specify a directory of static assets */
fractal.web.set('static.path', `/assets`);

/* Specify a directory of static assets */
fractal.web.set('static.path', `${__dirname}/dist`);

fractal.web.set('server.syncOptions', {
  open: true,
  browser: ['chrome'],
  notify: true,
});

const mandelbrot = require('@frctl/mandelbrot');

const myCustomisedTheme = mandelbrot({
  skin: 'black',
  panels: ['html', 'view', 'context', 'resources'],
  //  panels: ['html', 'view', 'context', 'resources', 'info', 'notes'],
});

fractal.web.theme(myCustomisedTheme);

// any other configuration or customisation here

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */

gulp.task('fractal:start', function () {
  const server = fractal.web.server({
    sync: true,
  });
  server.on('error', (err) => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
});

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */

gulp.task('fractal:build', function () {
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', (err) => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
});

gulp.task('css', function () {
  return gulp
    .src('./assets/styles/main.pcss')
    .pipe(postcss())
    .pipe(
      rename({
        extname: '.css',
      })
    )
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('watch', function () {
  gulp.watch(['./assets/styles/**/*.pcss'], gulp.series('css'));
  gulp.watch(['./styleguide/components/**/*.twig'], gulp.series('css'));
});

gulp.task('dev', function () {
  gulp.series('fractal:start', 'css', 'watch');
});

gulp.task('default', gulp.series('fractal:start', 'css', 'watch'));
