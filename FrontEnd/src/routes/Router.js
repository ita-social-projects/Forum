import {createBrowserRouter} from 'react-router-dom';
import {AuthProvider} from '../context';
import AdminRouter from './AdminRouter';
import ClientRouter from './ClientRouter';
import React from 'react';


const router = createBrowserRouter([
    {
      path: '/*',
      element: (
        <AuthProvider>
          <ClientRouter />
        </AuthProvider>
      ),
    },
    {
      path: '/customadmin/*',
      element: (
        <AuthProvider>
          <AdminRouter />
        </AuthProvider>
      ),
    },
  ]);

export default router;