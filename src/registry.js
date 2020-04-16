import "core-js";
import _ from "lodash";

const registry = {};
const NAME_PROPERTY = Symbol("name");

function registerBridge(name, bridge) {
  if (name === undefined) return;
  if (bridge === null || bridge === undefined) {
    throw new Error(`The bridge you are registering is ${bridge}`);
  }
  if (registry[name] !== undefined) {
    throw new Error(`Bridge name ${name} has been registered.`);
  }
  registry[name] = bridge;
  bridge[NAME_PROPERTY] = name;
}

const globalHook = {
  getBridge(name) {
    return registry[name];
  },
  getName(bridge) {
    if (bridge === null || bridge === undefined) return bridge;
    return bridge[NAME_PROPERTY];
  }
};
_.set(self, GLOBAL_NAMESPACE, globalHook);

export {registerBridge};
