import {configureStore} from '@reduxjs/toolkit';
import modal from '../modules/modalSlice';
import publicModal from '../modules/publicModalSlice';
import auth from '../modules/Auth';
import fix from '../modules/DetailSlice';
import fixList from '../modules/fixList';

const store = configureStore({
  reducer: {modal, publicModal, auth, fix, fixList},
});

export default store;
