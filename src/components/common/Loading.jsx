import React from 'react';

import classes from './Loading.module.css';
const Loading = () => {
  return (
    <div className={classes.main}>
          <div className={ classes.spinner}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;
