import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Membership from './pages/Membership';
import Coaches from './pages/Coaches';
import Transformations from './pages/Transformations';
import Location from './pages/Location';
import FreeTrial from './pages/FreeTrial';
import { TrialModalProvider } from './components/TrialForm/useTrialModal';

export default function App() {
  return (
    <Router>
      <TrialModalProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="classes" element={<Classes />} />
            <Route path="membership" element={<Membership />} />
            <Route path="coaches" element={<Coaches />} />
            <Route path="transformations" element={<Transformations />} />
            <Route path="location" element={<Location />} />
            <Route path="free-trial" element={<FreeTrial />} />
          </Route>
        </Routes>
      </TrialModalProvider>
    </Router>
  );
}
