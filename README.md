# react-bridge
This project makes it extremely convenient and intuitive to render React components in MojoJS. You are able to:
1. Launch a new React application or module from mojo.
2. Even mix use React components and Mojo widgets in existing mojo modules.

## Usage
Assume we have a React component `App`:
```javascript
/* App.js */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './_App.scss';

function App(props) {
  return <div className={styles.app}>Hello, {props.name}!</div>
}

App.propTypes = {
  name: PropTypes.string
};

export default App;
```

### Step 1: Create bridge for React component
**Bridges** are created to render React components in mojo. One bridge corresponds to one React component.
Using `createBridge(name, component)` to create a bridge for the given React component:
```javascript
/* allBridges.js */
import {createBridge} from 'src/bridge';
import App from 'src/components/App';

// Now we have a bridge named "AppBridge" for component "App"
export const AppBridge = createBridge("AppBridge", App);
```

### Step 2: Run bridge in mojo

#### Using bridge APIs
react-bridge will expose bridge APIs through the global variable `mstrReact`.
Use `mstrReact.render(name, props, container, callback)` to run bridge in mojo:
```javascript
// Render component "App" in container "#root"
var disposable = mstrReact.render("AppBridge", {
    name: 'jima'
}, document.getElementById('root'));

// Destroy component
disposable.destroy();
```

#### Using bridge widget
Sometimes, you need to insert React components into existing mojo widgets which are created in a declarative way like:
```javascript
children: [{
    scriptClass: 'xxxx'
}]
```
In this way, widgets are created, rendered and destroyed by mojo framework. It's very hard to insert a React component
using bridge APIs and then destroy it at a proper time. So we also need a declarative way to run bridges.

Here comes the mojo widget `mstrmojo.ReactBridge` which is a wrapper to run react bridge:
```javascript
children: [{
    // existing mojo widget
    scriptClass: 'xxxx'
},{
    scriptClass: 'mstrmojo.ReactBridge',
    bridge: 'AppBridge',
    getBridgeProps: function () {
        return {
            name: 'jima'
        };
    }
}]
```
By leveraging `mstrmojo.ReactBridge`, now the bridge is also created, rendered and destroyed by mojo framework. It has no difference with normal mojo widgets.