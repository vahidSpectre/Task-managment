import React, { useEffect, useMemo, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { itemActions } from '../redux/store';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { Delete } from '@mui/icons-material';

import Task from '../components/tasks/Task';
import Card from '../components/Card';

import { deleteTask, getAllTasks } from '../services/api';

import sharedStyles from '../styles/shared.module.css';
import classes from './Home.module.css';
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortDecreading, setSortDecreading] = useState(true);

  const [params, setParams] = useSearchParams();

  const items = useSelector(state => state.itemStore.items);

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const getAll = async () => {
    const result = await getAllTasks();
    setTasks(result.results);
    return result;
  };

  const handleDeleteAll = async () => {
    items.map(async item => {
      const result = await deleteTask(item);
      console.log(result);
    });
    dispatch(itemActions.discard());
    setTimeout(() => {
      getAll();
    }, 1000);
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (sortBy === '') {
      return setParams({});
    }
    setParams({ sort: `${sortBy}`, decreasing: `${sortDecreading}` });
  }, [sortBy, sortDecreading]);

  useEffect(() => {
    if (params.get('sort')) {
      const param = params.get('sort');
      setSortBy(param);
    }
    if (params.get('decreasing') === 'true') {
      setSortDecreading(true);
    } else {
      setSortDecreading(false);
    }
  }, [params]);

  const memoizedTasks = useMemo(() => {
    return tasks.sort((a, b) => {
      if (sortBy === 'completed') {
        if (sortDecreading) {
          return a.completed - b.completed;
        } else {
          return b.completed - a.completed;
        }
      } else if (sortBy === 'selected') {
        if (sortDecreading) {
          return items.includes(a.id) - items.includes(b.id);
        } else {
          return items.includes(b.id) - items.includes(a.id);
        }
      } else if (sortBy === 'date') {
        if (sortDecreading) {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      }
      return 0;
    });
  }, [tasks, sortBy, items, sortDecreading]);

  return (
    <div className={`${classes.home}`}>
      <Card className={classes.card}>
        <span className={classes.left}>
          <FormControl className={classes.form_control}>
            <InputLabel
              sx={{
                color: 'white',
                right: `${i18n.language === 'en' ? '0' : '20%'}`,
              }}
              id='demo-simple-select-label'
            >
              {t('sort')}
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={sortBy}
              label='Age'
              onChange={e => setSortBy(e.target.value)}
              variant='filled'
              IconComponent={() => <ArrowDropDown sx={{ color: 'white' }} />}
              sx={{
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiSvgIcon-root': {
                  color: 'white',
                },
              }}
            >
              <MenuItem value={'completed'}>{t('completed')}</MenuItem>
              <MenuItem value={'selected'}>{t('selected')}</MenuItem>
              <MenuItem value={'date'}>{t('date')}</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.sort_wrapper}>
            <span className={classes.sort_container}>
              <label htmlFor='dec' className={classes.sort_label}>
                {t('decreasing')}
              </label>
              <input
                className={classes.sort_input}
                type='radio'
                name='sort'
                id='dec'
                checked={sortDecreading}
                onChange={() => setSortDecreading(true)}
              />
              <span
                className={classes.costum_radio}
                onClick={() => setSortDecreading(true)}
              />
            </span>
            <span className={classes.sort_container}>
              <label htmlFor='inc' className={classes.sort_label}>
                {t('increasing')}
              </label>
              <input
                className={classes.sort_input}
                type='radio'
                name='sort'
                id='inc'
                checked={!sortDecreading}
                onChange={() => setSortDecreading(false)}
              />
              <span
                className={classes.costum_radio}
                onClick={() => setSortDecreading(false)}
              />
            </span>
          </div>
        </span>
        <span className={classes.right}>
          {items.length > 0 && (
            <Button
              onClick={handleDeleteAll}
              className={classes.delete_all_btn}
              startIcon={<Delete />}
              color='error'
              variant='outlined'
            >
              {t('deleteAll')}
            </Button>
          )}
        </span>
      </Card>
      <section className={sharedStyles.content}>
        {memoizedTasks.map((task, i) => {
          return <Task data={task} index={i} key={task.id} updateUi={getAll} />;
        })}
      </section>
    </div>
  );
};

export default Home;
