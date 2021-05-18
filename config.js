/**
 * A single place to configure project settings
 */
module.exports = {
    /**
     * define js bundles
     */
    bundles: {
        'reactBridge': ['src/bridges/TestApp.js']
    },

    /**
     * define where to expose bridge APIs.
     */
    bridgeAPINamespace: 'mstrReact'
};