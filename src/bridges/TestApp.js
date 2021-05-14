import React from 'react';
import {createBridge} from "src/bridge";

export default createBridge("TestApp", function (props) {
    return <button onClick={props.onClick}>{props.text}</button>;
});
