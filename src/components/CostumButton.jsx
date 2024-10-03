import React, { useEffect, useState } from 'react';

import { SvgIcon, Typography } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import classes from './CostumButton.module.css';
const CostumButton = ({ icon, text, onClick, currentPath }) => {
  const [language, setLanguage] = useState('');

  const lng = useSelector(state => state.languageStore.lng);

  const location = useLocation();

  useEffect(() => {
    setLanguage(lng);
  }, [lng,location.pathname]);

  return (
    <div
      className={`${language === 'en' ? classes.btn_ltr : classes.btn_rtl}`}
      onClick={onClick}
    >
      <div
        className={`${classes.content} ${
          language === 'en' ? classes.c_ltr : classes.c_rtl
        }`}
      >
        <SvgIcon className={classes.icon}>{icon}</SvgIcon>
        <Typography className={classes.text}>{text}</Typography>
        <SvgIcon
          className={`${classes.arrow} ${
            language === 'en' ? classes.arrow_forward : classes.arrow_before
          }`}
        >
          {language === 'en'? (
            <NavigateNext />
          ) : (
            <NavigateBefore />
          )}
        </SvgIcon>
      </div>
      <span className={classes.join} />
    </div>
  );
};

export default CostumButton;
