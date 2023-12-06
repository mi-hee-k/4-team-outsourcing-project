import {configureStore} from '@reduxjs/toolkit';

import auth from '../modules/Auth';

const store = configureStore({
  reducer: {
    auth,
  },
});

export default store;
