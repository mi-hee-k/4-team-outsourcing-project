import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import DetailPage from '../pages/DetailPage';
import EditDetailPage from '../pages/EditDetailPage';
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/adddetail/:id" element={<EditDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
