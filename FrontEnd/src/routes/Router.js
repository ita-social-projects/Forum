import {createBrowserRouter} from 'react-router-dom';
import {AuthProvider} from '../context';
import AdminPage from './AdminPage/AdminPage';
import BasicPage from './BasicPage/BasicPage';
import React from 'react';


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

export default router;