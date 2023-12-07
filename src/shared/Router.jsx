import React from 'react';

import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import DetailPage from '../pages/DetailPage';
import EditDetailPage from '../pages/EditDetailPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import HomePage from '../pages/HomePage';

import Layout from '../components/UI/Layout';
import {useSelector} from 'react-redux';
import {replace} from 'stylis';

function Router() {
  const {isLogin} = useSelector(state => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {isLogin ? <Route path="/profile" element={<ProfilePage />} /> : <></>}
          <Route path="/" element={<HomePage />} />

          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/adddetail/:id" element={<EditDetailPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
