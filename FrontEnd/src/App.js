import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './components/adminPage/AdminPage';
import BasicPage from './components/basicPage/BasicPage';

function App() {
  console.log('************************', process.env.REACT_APP_API_URL);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/*" element={<BasicPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
