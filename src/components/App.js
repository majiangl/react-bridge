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