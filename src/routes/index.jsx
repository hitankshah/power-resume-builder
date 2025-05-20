import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import ResumeBuilder from '../pages/ResumeBuilder';
import Templates from '../pages/Templates';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'dashboard',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
      },
      {
        path: 'builder',
        element: <ProtectedRoute><ResumeBuilder /></ProtectedRoute>
      },
      {
        path: 'templates',
        element: <ProtectedRoute><Templates /></ProtectedRoute>
      },
      {
        path: 'profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      }
    ]
  }
]);
