import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Logout from './components/logout';
import RegisterForm from './components/RegisterForm';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
