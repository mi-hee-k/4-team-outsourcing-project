import {createSlice} from '@reduxjs/toolkit';

const initialState = {isUseInput: false};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeAddModal: (state, action) => {
      state.isUseInput = false;
    },
    openAddmodal: (state, action) => {
      state.isUseInput = true;
    },
  },
});

export const {closeAddModal, openAddmodal} = modalSlice.actions;
export default modalSlice.reducer;
