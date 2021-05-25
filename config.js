/**
 * A single place to configure project settings
 */
module.exports = {
  /**
   * define js bundles
   */
  bundles: {
    'reactBridge': ['src/allBridges.js']
  },

  /**
   * define where to expose bridge APIs.
   */
  bridgeAPINamespace: 'mstrReact'
};