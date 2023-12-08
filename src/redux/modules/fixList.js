import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const listSlice = createSlice({
  name: 'fixList',
  initialState,
  reducers: {
    setList: (state, action) => {
      return action.payload;
    },
    addlist: (state, action) => {
      state.unshift(action.payload);
    },
  },
});

export default listSlice.reducer;

export const {setList, addlist} = listSlice.actions;
