import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './components/adminPage/AdminPage';
import BasicPage from './components/basicPage/BasicPage';
import { AuthContext } from './context';
import { useProvideAuth } from './hooks';

function App() {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/*" element={<BasicPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
