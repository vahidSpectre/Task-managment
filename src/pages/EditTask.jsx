import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Input } from '@mui/material';

import { getTask, updateTask } from '../services/api';

import sharedStyles from '../styles/shared.module.css';
import classes from './EditTask.module.css';
const EditTask = () => {
  const [data, setData] = useState({});
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [completed, setCompleted] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [captionError, setCaptionError] = useState(false);

  const params = useParams();

  const { t } = useTranslation();

  const get = async () => {
    const result = await getTask(params.id);
    setData(result.result);
  };

  useEffect(() => {
    setTitle(data.title);
    setCaption(data.description);
  }, [data]);

  useEffect(() => {
    get();
  }, [params.id]);

  const navigate = useNavigate();

  const update = async e => {
    e.preventDefault();
    e.stopPropagation();
    if (title.trim() === '' && caption.trim() === '') {
      setTitleError(true);
      setCaptionError(true);
      return;
    }
    if (title.trim() === '') return setTitleError(true);
    if (caption.trim() === '') return setCaptionError(true);
    const result = await updateTask({ title, caption, completed }, data.id);
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

  return (
    <div className={classes.edit}>
      <section className={sharedStyles.content}>
        <form className={`${sharedStyles.content} ${classes.form}`}>
          <div className={classes.title_wrapper}>
            <label htmlFor='add_title' className={classes.title}>
              <strong>{t('title')}</strong>
            </label>
            <span>
              <Input id='add_title' onChange={handleSetTitle} value={title} />
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
              <textarea
                id='add_caption'
                onChange={handleSetCaption}
                value={caption}
              />
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
              checked={data.completed || completed}
              onChange={e => setCompleted(e.target.checked)}
              id='checkbox'
              sx={{ color: 'white' }}
            />
          </div>
          <Button
            type='submit'
            variant='contained'
            className={classes.submit}
            onClick={update}
          >
            {t('update')}
          </Button>
        </form>
      </section>
    </div>
  );
};

export default EditTask;
