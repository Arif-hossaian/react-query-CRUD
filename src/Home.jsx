import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link to="/1">
        <p className="px-4 py-2 border border-red-400">Go to post page</p>
      </Link>
    </div>
  );
};

export default Home;
