import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const listSlice = createSlice({
  name: 'fixList',
  initialState,
  reducers: {
    setList: (state, action) => {
      return action.payload;
    },
    addList: (state, action) => {
      state.unshift(action.payload);
    },
  },
});

export default listSlice.reducer;

export const {setList, addList} = listSlice.actions;
