import React from 'react';
import Header from './Header';
import Body from './Body';

const Home = ({ user }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user}/>
    </div>
  );
};

export default Home;
