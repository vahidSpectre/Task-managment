import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { createTask } from '../services/api';

import sharedStyles from '../styles/shared.module.css';
import classes from './AddTask.module.css';
const AddTask = () => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [completed, setCompleted] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [captionError, setCaptionError] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const createNewTask = async e => {
    e.preventDefault();
    e.stopPropagation();
    if (title.trim() === '' && caption.trim() === '') {
      setTitleError(true);
      setCaptionError(true);
      return;
    }
    if (title.trim() === '') return setTitleError(true);
    if (caption.trim() === '') return setCaptionError(true);
    const result = await createTask({ title, caption, completed });
    if (result.response.ok) return navigate('/');
    console.log(result);
  };

  const handleSetTitle = e => {
    setTitleError(false);
    setTitle(e.target.value);
  };

  const handleSetCaption = e => {
    setCaptionError(false);
    setCaption(e.target.value);
  };

  const handleRemoveErrorTexts = () => {
    setTitleError(false);
    setCaptionError(false);
  };

  return (
    <section className={classes.add} onClick={handleRemoveErrorTexts}>
      <form className={`${sharedStyles.content} ${classes.form}`}>
        <div className={classes.title_wrapper}>
          <label htmlFor='add_title' className={classes.title}>
            <strong>{t('title')}</strong>
          </label>
          <span>
            <Input id='add_title' onChange={handleSetTitle} />

            <p
              className={`${classes.error_text} ${
                titleError ? classes.active_error : ''
              }`}
            >
              <small>{t('error_text')}</small>
            </p>
          </span>
        </div>
        <div className={classes.caption_wrapper}>
          <label htmlFor='add_caption' className={classes.caption}>
            <strong>{t('caption')}</strong>
          </label>
          <span>
            <textarea id='add_caption' onChange={handleSetCaption}></textarea>
            <p
              className={`${classes.error_text} ${
                captionError ? classes.active_error : ''
              }`}
            >
              <small>{t('error_text')}</small>
            </p>
          </span>
        </div>
        <div className={classes.check_wrapper}>
          <label htmlFor='checkbox' className={classes.check}>
            <strong>{t('completed')}</strong>
          </label>
          <Checkbox
            checked={completed}
            onChange={e => setCompleted(e.target.checked)}
            id='checkbox'
            sx={{ color: 'white' }}
          />
        </div>
        <Button
          type='submit'
          variant='contained'
          className={classes.submit}
          onClick={createNewTask}
        >
          {t('submit')}
        </Button>
      </form>
    </section>
  );
};

export default AddTask;
