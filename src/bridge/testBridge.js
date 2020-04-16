import React from 'react';
import ReactDOM from 'react-dom';

import {registerBridge} from "src/registry";

registerBridge("testBridge", {
  hello() {
    ReactDOM.render(
      <h1>Hello, React!</h1>,
      document.getElementById("root")
    );
  }
});
