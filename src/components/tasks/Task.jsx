import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@mui/material';

import { itemActions } from '../../redux/store';
import { deleteTask } from '../../services/api';

import classes from './Task.module.css';
import { DeleteForever, DoubleArrow } from '@mui/icons-material';
const Task = ({ data, index, updateUi }) => {
  const [taskData, setTaskData] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [lng, setLng] = useState('');

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const items = useSelector(state => state.itemStore.items);

  useEffect(() => {
    setTaskData(data);
  }, [data]);

  const handleSelectItem = e => {
    e.stopPropagation();
    setIsSelected(!isSelected);
  };

  const handleNavToEdit = () => {
    navigate(`/edit/${data.id}`);
  };

  useEffect(() => {
    if (isSelected) {
      dispatch(itemActions.add(data.id));
    } else {
      dispatch(itemActions.remove(data.id));
    }
  }, [isSelected, data.id]);

  useEffect(() => {
    setLng(i18n.language);
  }, [i18n.language]);

  const handleDelete = async () => {
    const result = await deleteTask(data.id);
    updateUi();
  };

  return (
    <div
      className={classes.task}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={classes.wrapper}>
        <span className={classes.title_wrapper}>
          <p className={classes.title}>{t('title')}:</p>
          <p className={classes.caption}>{taskData.title}</p>
        </span>
        <span className={classes.divider} />
        <span className={classes.caption_wrapper}>
          <p className={classes.title}>{t('caption')}</p>
          <p className={classes.caption}>{taskData.description}</p>
        </span>
      </div>

      <div className={classes.actions}>
        <div className={classes.completed}>
          <small>{t('completed')}</small>
          <Checkbox checked={data.completed} readOnly />
        </div>

        <div
          className={`${classes.completed} ${classes.delete_btn}`}
          onClick={handleDelete}
        >
          <small>{t('delete')}</small>
          <DeleteForever className={classes.delete_icon} />
        </div>

        <div className={classes.completed}>
          <small>
            {items.includes(data.id) ? (
              <>{t('selected')}</>
            ) : (
              <>{t('select')}</>
            )}
          </small>
          <Checkbox
            checked={items.includes(data.id) ? true : false}
            onChange={handleSelectItem}
          />
        </div>

        <div className={classes.completed} onClick={handleNavToEdit}>
          <DoubleArrow
            className={lng === 'en' ? classes.arrow_ltr : classes.arrow_rtl}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
