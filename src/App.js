import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Graphical from './pages/Graphical';
import Bisection from './pages/Bisection';
import FalsePosition from './pages/FalsePosition';
import Onepoint from './pages/Onepoint';
import Newton from './pages/Newton';
import Secant from './pages/Secant';
import Cramer from './pages/Cramer';

function App() {
  return (
    <div data-theme="cream">
      <Router>
          <Routes>
            <Route path="/" element={<Graphical />} />
            <Route path="/Bisection" element={<Bisection />} />
            <Route path="/FalsePosition" element={<FalsePosition />} />
            <Route path="/Onepoint" element={<Onepoint />} />
            <Route path="/Newton" element={<Newton />} />
            <Route path="/Secant" element={<Secant />} />
            <Route path="/Cramer" element={<Cramer />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
