import React from 'react';
import AddNew from './AddNew';

function Home() {
  return (
    <>
      <div>Home</div>
      <AddNew isLoggedIn={true} /> {/**true 하드코딩 */}
    </>
  );
}

export default Home;
