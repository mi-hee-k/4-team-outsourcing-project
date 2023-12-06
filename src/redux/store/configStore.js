import {configureStore} from '@reduxjs/toolkit';
import modal from '../modules/modalSlice';
import publicModal from '../modules/publicModalSlice';

import auth from '../modules/Auth';

const store = configureStore({
  reducer: {modal, publicModal, auth},
});

export default store;
