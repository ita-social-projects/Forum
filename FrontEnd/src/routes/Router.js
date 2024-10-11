import {createBrowserRouter} from 'react-router-dom';
import {AuthProvider} from '../context';
import AdminRouter from './AdminRouter';
import ClientRouter from './ClientRouter';


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
