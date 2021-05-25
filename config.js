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
   * define global namespace to expose for bridge APIs.
   */
  bridgeAPINamespace: 'mstrReact'
};