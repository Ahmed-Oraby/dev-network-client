import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Logout from './components/Logout';
import RegisterForm from './components/RegisterForm';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import NewPost from './components/NewPost';
import ProtectedRoute from './components/common/ProtectedRoute';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <NavBar />
      <div className=" min-h-screen">
        <Routes>
          <Route
            path="/newpost"
            element={
              <ProtectedRoute>
                <NewPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
