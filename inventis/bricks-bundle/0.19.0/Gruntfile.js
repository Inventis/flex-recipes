/* eslint-disable max-len,camelcase */
// eslint-disable-next-line no-undef
module.exports = function (grunt) {
    'use strict';
    // Project configuration.
    const requireJsOptions = {
        // name: path/to/almond, // this may turn usefull if we dont want to force requireJS loading, see https://github.com/requirejs/almond
        baseUrl: './assets',
        dir: 'public',
        optimize: 'none',
        name: 'App/Main',
        writeBuildTxt: false,
        include: [], // is build below

        wrap: true,
        keepBuildDir: true,
        findNestedDependencies: true,
        preserveLicenseComments: true,
        generateSourceMaps: true,
        insertRequire: ['App/Main'],
        paths: {
            'App': 'js',
            'Inventis/Bundle/BricksBundle': 'bundles/inventisbricks/js',
            'Inventis/Bundle/TranslationBundle': 'bundles/inventistranslation/js',
            'Inventis/Bundle/MediaBundle': 'bundles/inventismedia/js',
            'Inventis/Bundle/WebadminBundle': 'bundles/inventiswebadmin/js',
            'Inventis/Bundle/NavigationBundle': 'bundles/inventisnavigation/js',
            'Inventis/Bundle/ContentBundle': 'bundles/inventiscontent/js',
            'Inventis/Bundle/SeoBundle': 'bundles/inventisseo/js',
            'Inventis/Bundle/FormBundle': 'bundles/inventisform/js',
            // vendors
            'quill': 'vendor/quill/dist',
            'when/es6-shim': 'vendor/when/es6-shim',
            'chartjs': 'vendor/chartjs',
            'nanoajax': 'vendor/nanoajax/nanoajax.min',
            'template-binding': 'vendor/template-binding/src/TemplateBinding',
            'observe-js': 'vendor/observe-js/src/observe',
            'node-bind': 'vendor/node-bind/src/NodeBind',
            'Draggable': 'vendor/@shopify/draggable/lib/draggable.bundle',
            'selectable': 'vendor/selectable.js/selectable',
            'moment': 'vendor/moment/moment',
            'moment-timezone': 'vendor/moment-timezone/builds/moment-timezone-with-data.min',
            '@inventis': 'vendor/@inventis'
        },
        packages: [
            {name: 'SearchString', location: 'vendor/search-string', main: 'searchString'},
        ],
        shim: {
            'nanoajax': {
                exports: 'nanoajax',
            },
            'template-binding': {
                exports: 'Platform',
                deps: ['observe-js'],
            },
            'node-bind': {
                exports: 'Platform',
                deps: ['observe-js', 'template-binding'],
            },
        },
        map: {
            '*': {
                // whenever anyone requests shopify/draggable, load draggable instead
                // as shopify does a manual define("Draggable") :(
                'shopify/draggable': 'Draggable',
            },
        },
        done: function (done, output) {
            var _ = require('lodash');
            var rjsanalysis = require('rjs-build-analysis');
            var ast = rjsanalysis.parse(output);
            var cssExclude = new RegExp('\.css$');
            ast.bundles = _.filter(ast.bundles, function (bundle) {
                return !bundle.parent.match(cssExclude);
            });
            var duplicates = rjsanalysis.duplicates(ast);

            if (Object.keys(duplicates).length) {
                grunt.log.subhead('Duplicates found in requirejs build: ' + Object.keys(duplicates).length);
                for (var n in duplicates) {
                    if (duplicates.hasOwnProperty(n)) {
                        grunt.log.warn(duplicates[n]);
                    }
                }
                //return done(new Error('r.js built duplicate modules, please check the excludes option.'));
            }

            return done();
        },
    };
    const includedPackages = [
        'App',
        'Inventis/Bundle/BricksBundle',
        'Inventis/Bundle/TranslationBundle',
        'Inventis/Bundle/NavigationBundle',
        'Inventis/Bundle/ContentBundle',
        'Inventis/Bundle/SeoBundle',
        'Inventis/Bundle/MediaBundle',
        'Inventis/Bundle/WebadminBundle',
        'Inventis/Bundle/FormBundle',
    ];
    const ignoredModules = [
        'App/Main',
        'App/app',
        'Inventis/Bundle/BricksBundle/Main',
        'Inventis/Bundle/BricksBundle/Mixins/Adapters/Renderers/Ext/FileField',
        'Inventis/Bundle/BricksBundle/Mixins/Adapters/Renderers/Ext/Grid',
        'Inventis/Bundle/BricksBundle/Brick/Form/Field/Input/File',
        'Inventis/Bundle/BricksBundle/Brick/Form/Field/Input/File/Image',
        'Inventis/Bundle/BricksBundle/Brick/ImageCropper',
        'Inventis/Bundle/BricksBundle/Mixins/Plupload',

        // optional dependencies you can include these when you have the vendor installed and mapped
        'Inventis/Bundle/BricksBundle/Quill/QuillDeltaRenderStrategy',
        'Inventis/Bundle/BricksBundle/Quill/QuillRenderStrategyBase',
        'Inventis/Bundle/BricksBundle/Quill/QuillHtmlRenderStrategy',
        'Inventis/Bundle/BricksBundle/Quill/quillConfig'
    ];
    includedPackages.forEach((packageName) => {
        try {
            grunt.file.recurse(
                process.cwd() + '/public/' + requireJsOptions.paths[packageName],
                function (abspath, rootdir, subdir, filename) {
                    if (filename.substr(-3) !== '.js') {
                        return;
                    }
                    let name = filename.split('.').shift();
                    let include = packageName + (subdir ? '/' + subdir : '') + '/' + name;

                    if (ignoredModules.includes(include)) {
                        return;
                    }
                    requireJsOptions.include.push(include);
                }
            );
        } catch (e) {
            console.info(e.message);
        }
    });
    grunt.initConfig({
        requirejs: {
            all: {
                options: requireJsOptions,
            },
        },
        copy: {
            node_modules: {
                cwd: 'node_modules', // set working folder / root to copy
                src: [
                    '@inventis/ckeditor5-build-classic/**',
                    'chartjs/chart.js',
                    'quill/dist/**',
                    'when/es6-shim/Promise.js',
                    'requirejs/require.js',
                    'nanoajax/nanoajax.min.js',
                    '@shopify/draggable/lib/draggable.bundle.js',
                    'selectable.js/selectable.js',
                    'observe-js/src/**',
                    'template-binding/src/*.js',
                    'node-bind/src/**',
                    'moment/moment.js',
                    'moment-timezone/builds/moment-timezone-with-data.min.js',
                    '@inventis/webadmin-styleguide-dist/**',
                    '!**/node_modules/**', // make sure we ignore any node_modules in packages, who does this #$@?!
                ],
                dest: 'public/vendor', // destination folder
                expand: true, // required when using cwd
            }
        },
        clean: {
            build: ['public/build'],
            vendor: ['public/vendor']
        },
        amdwrap: {
            searchString: {
                expand: true,
                cwd: "./node_modules/search-string/dist/node",
                src: ["*.js"],
                dest: "./public/vendor/search-string/"
            }
        },
        uglify: {
            prod: {
                options: {
                    mangle: true
                },
                files: [
                    {
                        expand: true,
                        src: 'public/js/**/*.js',
                        dest: 'public/js',
                        cwd: './',
                        rename: function (dst, src) {
                            // To keep src js files and make new files as *.min.js :
                            // return dst + '/' + src.replace('.js', '.min.js');
                            // Or to override to src :
                            return src;
                        }
                    },
                    {
                        expand: true,
                        src: 'public/bundles/inventis*/**/*.js',
                        dest: 'public/bundles',
                        cwd: './',
                        rename: function (dst, src) {
                            // To keep src js files and make new files as *.min.js :
                            // return dst + '/' + src.replace('.js', '.min.js');
                            // Or to override to src :
                            return src;
                        }
                    },
                ]
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-amd-wrap");

    // Default task(s).
    grunt.registerTask('build', ['clean', 'copy', 'amdwrap', 'requirejs:all']);
};
