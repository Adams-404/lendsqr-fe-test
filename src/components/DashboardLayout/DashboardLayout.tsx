import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import './DashboardLayout.scss';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      <Header onMenuToggle={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <main className="dashboard-layout__main">
        <div className="dashboard-layout__content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
