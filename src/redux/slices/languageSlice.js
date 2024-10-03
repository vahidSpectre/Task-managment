import { createSlice } from '@reduxjs/toolkit';

const initialState = { lng: localStorage.getItem('i18nextLng') || 'en' };

const languageSlice = createSlice({
  name: 'lng',
  initialState,
  reducers: {
    en(state) {
      state.lng = 'en';
      localStorage.setItem('i18nextLng', 'en');
    },
    fr(state) {
      state.lng = 'fr';
      localStorage.setItem('i18nextLng', 'fr');
    },
  },
});

export default languageSlice;
