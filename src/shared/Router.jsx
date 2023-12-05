import React from 'react';
import Detail from '../components/UI/Detail';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Detail/:id" element={<Detail />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
