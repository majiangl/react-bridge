import React from 'react';
import {createBridge} from "src/bridge";

export default createBridge("TestApp", function (props) {
    return <h1>{props.text}</h1>;
});
