import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Graphical from './pages/Graphical';

function App() {
  return (
    <div data-theme="cream">
      <Router>
          <Routes>
            <Route path="/" element={<Graphical />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
