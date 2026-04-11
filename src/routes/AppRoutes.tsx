import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const AppRoutes = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<div>Login Page - Coming Soon</div>} />
        <Route path="/register" element={<div>Register Page - Coming Soon</div>} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated
              ? <div>Dashboard - Coming Soon</div>
              : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;