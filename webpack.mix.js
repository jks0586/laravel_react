const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
require('dotenv').config();


// mix.react('resources/js/admin.js', 'public/js')
// .react('resources/js/website.js', 'public/js')
//     .sass('resources/sass/app.scss', 'public/css');

 mix.js('resources/js/admin.js', 'public/admin/js').js('resources/js/website.js', 'public/website/js').react().sass('resources/sass/app.scss', 'public/css');
// mix.js('resources/js/admin.js', 'public/admin/js').react().sass('resources/sass/app.scss', 'public/css');
