import React from 'react';
import {createBridge} from 'src/bridge';

import styles from './_TestApp.scss';

export default createBridge("TestApp", function (props) {
    return <button className={styles.btn} onClick={props.onClick}>{props.text}</button>;
});
