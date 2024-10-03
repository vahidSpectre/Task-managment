import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [] };

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    add(state, action) {
      state.items.push(action.payload);
    },
    remove(state, action) {
      state.items = state.items.filter(item => item !== action.payload);
    },
    discard(state) {
      state.items = [];
    },
  },
});

export default itemSlice;
