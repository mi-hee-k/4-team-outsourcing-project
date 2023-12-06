import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    logout: (state, action) => {
      return (state = '');
    },
  },
});

export const {login} = AuthSlice.actions;
export default AuthSlice.reducer;
