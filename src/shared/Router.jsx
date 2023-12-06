import React from 'react';
import Detail from '../components/UI/Detail';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../components/Home';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
