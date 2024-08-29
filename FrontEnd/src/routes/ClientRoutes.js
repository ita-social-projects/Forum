import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import BasicPage from '../components/BasicPage/BasicPage';
import {AuthProvider} from '../context';

const clientRouter = createBrowserRouter([
    {
      path: '/*',
      element: (
        <AuthProvider>
          <BasicPage />
        </AuthProvider>
      ),
    },
    ]);

export default clientRouter;