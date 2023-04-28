'use strict';

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();

/* Set the title of the project */
fractal.set('project.title', 'Styleguide Base');

/* Tell Fractal where the components will live */
fractal.components.set('path', __dirname + '/styleguide/components');

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', __dirname + '/styleguide/docs');

/* destination for the static export */
fractal.web.set('builder.dest', 'docs'); 

const mandelbrot = require('@frctl/mandelbrot');

const myCustomisedTheme = mandelbrot({
    skin: "fuchsia",
    panels: ["html", "info", "resources"]
});

// myCustomisedTheme.addLoadPath(__dirname + '/styleguide/_theme-overrides');

fractal.web.theme(myCustomisedTheme);
