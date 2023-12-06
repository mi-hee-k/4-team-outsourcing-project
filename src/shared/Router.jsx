import React from 'react';
import Detail from '../components/UI/Detail';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../pages/Home';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Detail/:id" element={<Detail />} />
        <Route />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
