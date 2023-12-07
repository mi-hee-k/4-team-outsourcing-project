import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import DetailPage from '../pages/DetailPage';
import EditDetailPage from '../pages/EditDetailPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import HomePage from '../pages/HomePage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/editdetail/:id" element={<EditDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
