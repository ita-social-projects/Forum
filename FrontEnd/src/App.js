import React from 'react';
import './App.css';
import './global.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminPage from './components/adminPage/AdminPage';
import BasicPage from './components/basicPage/BasicPage';
import { AuthProvider } from './hooks';

function App() {

  const router = createBrowserRouter([
    {
      path: '/*',
      element: (
        <AuthProvider>
          <BasicPage />
        </AuthProvider>
      )
    },
    {
      path: '/customadmin/*',
      element: (
        <AuthProvider>
          <AdminPage />
        </AuthProvider>
      )
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
