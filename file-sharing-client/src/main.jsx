import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Home from './pages/home.jsx';
import ProtectedLogedInRoute from './Routes/logedInRoute.jsx';
import Dashboard from './pages/dashboard.jsx';

createRoot(document.getElementById('root')).render(
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
)
