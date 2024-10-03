import React, { useEffect, useState } from 'react';

import { Home, PostAdd } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem, Select } from '@mui/material';

import CostumButton from '../CostumButton';
import { languageActions } from '../../redux/store';

import classes from './Header.module.css';
const Header = () => {
  const [lng, setLng] = useState('');

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const lngState = useSelector(state => state.languageStore.lng);

  const handleEnLng = () => {
    dispatch(languageActions.en());
    i18n.changeLanguage('en');
  };

  const handleFrLng = () => {
    dispatch(languageActions.fr());
    i18n.changeLanguage('fr');
  };

  useEffect(() => {
    setLng(lngState);
  }, [lngState]);
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <span className={classes.btn_wrapper}>
          <CostumButton
            text={t('home')}
            icon={<Home />}
            currentPath={'/'}
            onClick={() => navigate('/')}
          />
        </span>
        <span className={classes.btn_wrapper}>
          <CostumButton
            text={t('add')}
            icon={<PostAdd />}
            currentPath={'/edit/:id'}
            onClick={() => navigate('/add')}
          />
        </span>
      </div>
      <Select className={classes.lng_dropdown} value={lng} IconComponent={''}>
        <MenuItem value={'fr'} onClick={() => handleFrLng()}>
          FR
        </MenuItem>
        <MenuItem value={'en'} onClick={() => handleEnLng()}>
          EN
        </MenuItem>
      </Select>
    </header>
  );
};

export default Header;
