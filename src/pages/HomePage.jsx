import React from 'react';
import AddNew from '../components/AddNew';
import {useSelector, useState} from 'react-redux';
import Auth from '../redux/modules/Auth';

function HomePage() {
  return (
    <>
      <div>Home</div>
      <AddNew /> {/**true 하드코딩 */}
    </>
  );
}

export default HomePage;
