import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './Navbar';
import PublicNavbar from './PublicNavbar';
import LandingPage from './LandingPage';
import Home from './Home';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import WriteBlog from './WriteBlog';
import ReadBlog from './ReadBlog';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import { getSession, getUserRole } from './auth';

export default function App() {
  const isAuthenticated = !!getSession();
  const role = getUserRole();

  // Show admin dashboard links if admin, else show user nav
  const showAdminNavbar = isAuthenticated && role === 'admin';
  const showUserNavbar = isAuthenticated && role !== 'admin';

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? (
        showAdminNavbar ? (
          <Navbar admin />
        ) : (
          <Navbar />
        )
      ) : (
        <PublicNavbar />
      )}
      <div className="pt-16">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute guestOnly redirectTo="/home">
                <LandingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute guestOnly redirectTo="/home">
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute guestOnly redirectTo="/home">
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/write"
            element={
              <ProtectedRoute>
                <WriteBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <ProtectedRoute>
                <ReadBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">404</h1>
                <p className="text-gray-500">Page not found.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}