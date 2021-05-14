import "core-js/stable";
import _ from "lodash";
import ReactDOM from 'react-dom';

const registry = {};
const NAME = Symbol("name");

function _createBridge(render) {
    function renderComponent(props, container, callback) {
        ReactDOM.render(render(props), container, callback);
        return {
            destroy: function () {
                ReactDOM.unmountComponentAtNode(container);
            }
        }
    };
    renderComponent[NAME] = name;
    return renderComponent;
}

/**
 * Wrap a react functional component as a bridge.
 *
 * @param name      {string}                                - unique bridge name
 * @param component {function(Object): React.ReactElement}  - A react functional component or a render function
 * @returns {function(Object, Node): {destroy: function(): void}}
 */
function createBridge(name, component) {
    if (!_.isString(name)) {
        throw new Error('The name parameter should be a string.');
    }
    if (!_.isFunction(component)) {
        throw new Error(`The render parameter should be a function.`);
    }
    const bridge = _createBridge(component);
    registry[name] = bridge;
    return bridge;
}

const bridgeAPIs = {
    /**
     * Get bridge by name
     * @param name {string}
     * @returns {*}
     */
    getBridge(name) {
        return registry[name];
    },
    /**
     * Return name of specified bridge
     * @param bridge {Function}
     * @returns {*}
     */
    getName(bridge) {
        if (bridge === null || bridge === undefined) return bridge;
        return bridge[NAME];
    },
    /**
     * Render react bridge by specifying name, props and container to render
     * @param name      {string}    - bridge name
     * @param props     {Object}    - properties to render bridge
     * @param container {Node}      - container DOM Node
     * @param callback  {Function}  - called after the component is rendered
     * @returns {function(Object, Node): {destroy: function(): void}}
     */
    render(name, props, container, callback) {
        const bridge = this.getBridge(name);
        return bridge(props, container, callback);
    }
};
_.set(self, BRIDGE_API_NAMESPACE, bridgeAPIs);

export {createBridge};
