
import Login from './Login/Login'
import { useState ,useEffect} from 'react';
import DashboardGeneral from './Layout/Layout';
import axios from "axios";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function App() {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("token"));

   const handleLogin = (token) => {

    localStorage.setItem('token', token); // Guardar el token en localStorage
    setAuthToken(token);  // Guarda el token en el estado
  };

  

  const handleLogout = () => {    
   
    localStorage.removeItem('token');
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  setAuthToken(null);


  };


  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          authToken ? <Navigate replace to="/dashboard" /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/dashboard" element={
          authToken ? <DashboardGeneral  onLogout={handleLogout}/> : <Navigate replace to="/login" />
        } />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

