import React from 'react';

import styles from './_App.scss';

export default function App(props) {
  return <div className={styles['app']}>Hello, {props.name}!</div>
};