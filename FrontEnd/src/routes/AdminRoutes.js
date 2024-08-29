import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import {AuthProvider} from '../context';
import AdminPage from '../components/AdminPage/AdminPage';

const adminRouter = createBrowserRouter([
    {
      path: '/customadmin/*',
      element: (
        <AuthProvider>
          <AdminPage />
        </AuthProvider>
      ),
    },
    ]);

export default adminRouter;