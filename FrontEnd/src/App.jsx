import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import clientRouter from './routes/ClientRoutes';
import adminRouter from './routes/AdminRoutes';

function App() {
  return (
    <div className="App">
      <h1>
        Крафтовий майданчик для обміну інформацією втілюй свої ідеї в життя
      </h1>
      <RouterProvider router={clientRouter} />
      <RouterProvider router={adminRouter} />
    </div>
  );
}

export default App;
