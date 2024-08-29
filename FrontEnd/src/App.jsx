import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminPage from './components/AdminPage/AdminPage';
import BasicPage from './components/BasicPage/BasicPage';
import { AuthProvider } from './context';

function App() {
  const router = createBrowserRouter([
    {
      path: '/*',
      element: (
        <AuthProvider>
          <BasicPage />
        </AuthProvider>
      ),
    },
    {
      path: '/customadmin/*',
      element: (
        <AuthProvider>
          <AdminPage />
        </AuthProvider>
      ),
    },
  ]);

  return (
    <div className="App">
      <h1>
        Крафтовий майданчик для обміну інформацією втілюй свої ідеї в життя
      </h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
