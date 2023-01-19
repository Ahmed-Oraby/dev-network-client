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
import UpdateProfile from './components/UpdateProfile';
import Developers from './components/Developers';

function App() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen p-3">
        <Routes>
          <Route
            path="/developers"
            element={
              <ProtectedRoute>
                <Developers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateprofile"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
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
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
