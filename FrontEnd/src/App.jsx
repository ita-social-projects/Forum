import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';

function App() {
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
