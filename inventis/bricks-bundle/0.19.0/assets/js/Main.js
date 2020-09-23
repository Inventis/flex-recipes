if (navigator !== undefined && navigator.getDeviceStorage === undefined) {
    navigator.getDeviceStorage = function () {
        throw new Error(
            'navigator.getDeviceStorage is stubbed to avoid observe-js/src/observe.js creating new functions to ' +
            'check if eval is allowed, which generates a (spurious) CSP error.'
        );
    };
}
require.config({
    waitSeconds: 20,
    /*
     * to maintain namespace in components we start from here
     * module specific code is rewritten through .htaccess
     */
    baseUrl: '/',
    paths: {
        'App': 'app/js',
        'Inventis/Bundle/BricksBundle': 'bundles/inventisbricks/js',
        'Inventis/Bundle/TranslationBundle': 'bundles/inventistranslation/js',
        'Inventis/Bundle/MediaBundle': 'bundles/inventismedia/js',
        'Inventis/Bundle/WebadminBundle': 'bundles/inventiswebadmin/js',
        'Inventis/Bundle/NavigationBundle': 'bundles/inventisnavigation/js',
        'Inventis/Bundle/ContentBundle': 'bundles/inventiscontent/js',
        'Inventis/Bundle/StyleguideBundle': 'bundles/inventisstyleguide/js',
        // define all vendor package loading rules below
        'quill': 'vendor/quill/dist',
        'grapesjs': 'vendor/grapesjs/dist',
        'Sizzle': 'vendor/sizzle/dist/sizzle.min',
        'Plupload': 'vendor/plupload/js/plupload.full',
        'when': 'vendor/when',
        'nanoajax': 'vendor/nanoajax/nanoajax.min',
        'template-binding': 'vendor/template-binding/src/TemplateBinding',
        'observe-js': 'vendor/observe-js/src/observe',
        'node-bind': 'vendor/node-bind/src/NodeBind',
        'Draggable': 'vendor/@shopify/draggable/lib/draggable.bundle',
        'selectable': 'vendor/selectable.js/selectable',
        'moment': 'vendor/moment/moment',
        'moment-timezone': 'vendor/moment-timezone/builds/moment-timezone-with-data.min',
        '@inventis': 'vendor/@inventis',
    },
    packages: [
        {name: 'SearchString', location: 'vendor/search-string', main: 'searchString'},
    ],
    map: {
        '*': {
            /*
             * whenever anyone requests shpify/draggable, load draggable instead
             * as shopify does a manual define("Dragable") :(
             */
            'shopify/draggable': 'Draggable',
        },
    },
    shim: {
        'Aviary': {
            exports: 'Aviary',
        },
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

    config: {
        'Inventis/Bundle/BricksBundle/Config': {
            locale: document.body.dataset.locale,
            enableBrickDebugging: document.body.dataset.enableBrickDebugging === '1',
        },
    },
});
require(
    [
        'Inventis/Bundle/BricksBundle/Brick/AttributeConfigFactory',
        'Inventis/Bundle/BricksBundle/Brick/Manager',
        'Inventis/Bundle/BricksBundle/Base64EncodedJsonParser',
    ],
    function (AttributeConfigFactory, Manager, Base64EncodedJsonParser) {
        'use strict';

        var factory = new AttributeConfigFactory(Base64EncodedJsonParser, Manager);
        factory.create(window.document);
    }
);
