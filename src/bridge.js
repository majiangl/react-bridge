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
 * Wrap a react functional component as a bridge, so that react components can be rendered in non-react environments.
 *
 * @param name      {string}                                - unique bridge name
 * @param render    {function(Object): React.ReactElement}  - render function which is basically a functional component
 * @returns {function(Object, Node): {destroy: function(): void}}
 */
function createBridge(name, render) {
    if (!_.isString(name)) {
        throw new Error('The name parameter should be a string.');
    }
    if (!_.isFunction(render)) {
        throw new Error(`The render parameter should be a function.`);
    }
    const bridge = _createBridge(render);
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
     * @returns {function(Object, Node): {destroy: function(): void}}
     */
    render(name, props, container) {
        const bridge = this.getBridge(name);
        return bridge(props, container);
    }
};
_.set(self, BRIDGE_API_NAMESPACE, bridgeAPIs);

export {createBridge};
