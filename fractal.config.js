'use strict';

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();

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
//fractal.web.set('static.path', `${__dirname}/public/dist`);


const mandelbrot = require('@frctl/mandelbrot');

const myCustomisedTheme = mandelbrot({
    skin: "black",
    panels: ['html', 'view', 'context', 'resources', 'info', 'notes']
});

// myCustomisedTheme.addLoadPath(__dirname + '/styleguide/_theme-overrides');

fractal.web.theme(myCustomisedTheme);
