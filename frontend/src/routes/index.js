import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));
const PageNotFound = lazy(() => import('../pages/NotFound'));


const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

const MainRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Dashboard />} />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default MainRoutes;
