import React from 'react';
import './App.css';
import './global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import AdminPage from './components/adminPage/AdminPage';
import BasicPage from './components/basicPage/BasicPage';
import { AuthContext } from './context';
import { useProvideAuth } from './hooks';

function App() {
  const auth = useProvideAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/*" element={<BasicPage />} />
        <Route path="/customadmin/*" element={<AdminPage />} />
      </>
    )
  );

  return (
    <AuthContext.Provider value={auth}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
    </AuthContext.Provider>
  );
}

export default App;
