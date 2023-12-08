import {configureStore} from '@reduxjs/toolkit';
import modal from '../modules/modalSlice';
import publicModal from '../modules/publicModalSlice';

import auth from '../modules/Auth';
import fixList from '../modules/fixList';

const store = configureStore({
  reducer: {modal, publicModal, auth, fixList},
});

export default store;
