import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';

const Dashboard: React.FC = () => {
  // Dashboard redirects to Users page as shown in the Figma
  return <Navigate to="/users" replace />;
};

export default Dashboard;
