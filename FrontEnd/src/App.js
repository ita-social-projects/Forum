import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './components/adminPage/AdminPage';
import BasicPage from './components/basicPage/BasicPage';
import { AuthContext } from './context';
import { useProvideAuth } from './hooks';
// import { Search } from './components/SearchPage/Search';

function App() {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/*" element={<BasicPage />} />
            <Route path="/customadmin/*" element={<AdminPage />} />
            {/* <Route path="/search" element={<Search isAuthorized={auth} />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
