import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import AdminDashboard from './components/Admin/AdminDashboard';
import NormalUserDashboard from './components/NormalUser/NormalUserDashboard';
import StoreOwnerDashboard from './components/StoreOwner/StoreOwnerDashboard';
import Navbar from './components/Layout/Navbar';

function App() {
  const { user, loading } = useAuth();

  const getDashboard = () => {
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;

    switch (user.role) {
      case 'System Administrator':
        return <AdminDashboard />;
      case 'Normal User':
        return <NormalUserDashboard />;
      case 'Store Owner':
        return <StoreOwnerDashboard />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={getDashboard()} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;