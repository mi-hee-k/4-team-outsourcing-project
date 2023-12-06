import {configureStore} from '@reduxjs/toolkit';
import modal from '../modules/modalSlice';
import publicModal from '../modules/publicModalSlice';

const store = configureStore({
  reducer: {modal, publicModal},
});

export default store;
