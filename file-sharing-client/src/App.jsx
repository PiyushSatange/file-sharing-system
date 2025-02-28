import toast, { Toaster } from 'react-hot-toast';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import ProtectedLogedInRoute from './Routes/logedInRoute';
import Dashboard from './pages/dashboard';
import { BrowserRouter, Route, Routes } from 'react-router';



const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" 
        element={
          <ProtectedLogedInRoute>
            <Dashboard/>
          </ProtectedLogedInRoute>
        } 
      />
    </Routes>
  </BrowserRouter>
  );
};

export default App;