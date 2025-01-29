import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AllDevices } from './pages/AllDevices';
import { PhoneDetail } from './pages/PhoneDetail';
import { FavoritesPage } from './pages/FavoritesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mobile-phones" element={<AllDevices />} />
        <Route path="/phone/:id" element={<PhoneDetail />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;