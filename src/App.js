import React from 'react';
import Posts from './Posts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Post from './Post';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Router>
  );
};

export default App;
