import React from 'react';
import AddNew from '../components/AddNew';

function HomePage() {
  return (
    <>
      <div>Home</div>
      <AddNew isLoggedIn={true} /> {/**true 하드코딩 */}
    </>
  );
}

export default HomePage;
