import React, { useEffect, useState } from 'react';
import { MenuItem, Select, Stack } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { languageActions } from '../../redux/store';
import { Home, PostAdd } from '@mui/icons-material';

import GithubButton from '../GithubButton';
import CostumButton from '../CostumButton';

import sharedStyles from '../../styles/shared.module.css';
import classes from './Sidebar.module.css';
const Sidebar = ({ children }) => {
  const [lng, setLng] = useState('');

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

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
    <Stack
      direction={'row'}
      className={`${classes.wrapper} ${
        lng === 'en' ? sharedStyles.lrt : sharedStyles.rtl
      }`}
    >
      <section
        className={`${classes.sidebar}`}
      >
        <div className={classes.top_part}>
          <Select
            className={classes.lng_dropdown}
            value={lng}
            IconComponent={''}
          >
            <MenuItem value={'fr'} onClick={() => handleFrLng()}>
              FR
            </MenuItem>
            <MenuItem value={'en'} onClick={() => handleEnLng()}>
              EN
            </MenuItem>
          </Select>
          <div className={classes.action_section}>
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
        </div>
        <GithubButton className={classes.github_btn} />
      </section>

      {children}
    </Stack>
  );
};

export default Sidebar;
