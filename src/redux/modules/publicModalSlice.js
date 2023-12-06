import {createSlice} from '@reduxjs/toolkit';

const initialState = {isUse: false, title: '제목', message: '메세지', btnMsg: '', btnFn: '', btnMsg2: '', btnFn2: ''};

const publicModalSlice = createSlice({
  name: 'publicModal',
  initialState,
  reducers: {
    closePublicModal: (state, action) => {
      state.isUse = false;
    },
    showPublicModal: (state, action) => {
      return {...state, ...action.payload};
    },
  },
});

export const {closePublicModal, showPublicModal} = publicModalSlice.actions;
export default publicModalSlice.reducer;
