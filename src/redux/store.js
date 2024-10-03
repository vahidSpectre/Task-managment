import { configureStore } from '@reduxjs/toolkit';

import languageSlice from './slices/languageSlice';
import itemSlice from './slices/itemSlice';

const store = configureStore({
  reducer: {
    languageStore: languageSlice.reducer,
    itemStore: itemSlice.reducer,
  },
});

export const languageActions = languageSlice.actions;
export const itemActions = itemSlice.actions;

export default store;
