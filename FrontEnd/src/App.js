import React from 'react';
import './App.css';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import AdminPage from './components/adminPage/AdminPage';
import BasicPage from './components/basicPage/BasicPage';
import { AuthProvider } from './hooks';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/*" element={<BasicPage />} />
        <Route path="/customadmin/*" element={<AdminPage />} />
      </>
    )
  );

  return (
    <AuthProvider>
        <div className="App">
          <RouterProvider router={router} />
        </div>
    </AuthProvider>
  );
}

export default App;
