import {configureStore} from '@reduxjs/toolkit';
import modal from '../modules/modalSlice';
import publicModal from '../modules/publicModalSlice';
import auth from '../modules/Auth';
import fix from '../modules/Detail';

const store = configureStore({
  reducer: {modal, publicModal, auth, fix},
});

export default store;
