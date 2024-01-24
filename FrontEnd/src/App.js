import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './components/adminPage/AdminPage';
import BasicPage from './components/basicPage/BasicPage';
import { AuthProvider } from './hooks';

function App() {

  return (
      <BrowserRouter>
        <AuthProvider>
          <div className="App">
            <Routes>
              <Route path="/*" element={<BasicPage />} />
              <Route path="/customadmin/*" element={<AdminPage />} />
            </Routes>
          </div>
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
