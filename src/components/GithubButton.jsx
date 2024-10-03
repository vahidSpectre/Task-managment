import React from 'react';

import classes from './GithubButton.module.css';
import { SvgIcon } from '@mui/material';
import { GitHub } from '@mui/icons-material';
const GithubButton = ({className}) => {
  return (
    <div className={className}>
      <div className={`${classes.brand} ${classes.github}`}>
        <span
          className={`${classes.btn} ${classes.btn_primary}`}
          onClick={() =>
            window.open('https://github.com/vahidSpectre', '_blank')
          }
        >
          <span className={`${classes.icon_span}`}>
            <SvgIcon className={classes.icon}>
              <GitHub />
            </SvgIcon>
          </span>
          <span className={`${classes.text}`}>GitHub</span>
        </span>
      </div>
    </div>
  );
};

export default GithubButton;
