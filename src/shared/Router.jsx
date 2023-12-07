import React from 'react';
import Detail from '../components/UI/Detail';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';

import HomePage from '../pages/HomePage';

import Layout from '../components/UI/Layout';
import {useSelector} from 'react-redux';
import {replace} from 'stylis';

function Router() {
  const {islogin} = useSelector(state => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {!!islogin ? <Route path="/profile" element={<ProfilePage />} /> : null}
          <Route path="/" element={<HomePage />} />
          <Route path="/Detail/:id" element={<Detail />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
