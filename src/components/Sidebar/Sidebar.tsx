import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { storage } from '../../utils/storage';
import './Sidebar.scss';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Import all icons from public folder - we'll use img tags
const iconPath = '/icons/';

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    storage.clearAuthState();
    navigate('/');
  };

  const isActive = (path?: string) => path && (location.pathname === path || location.pathname.startsWith(path));

  const navItems = [
    { section: null, items: [{ label: 'Dashboard', icon: 'organisation.svg', path: '/dashboard' }] },
    {
      section: 'CUSTOMERS', items: [
        { label: 'Users', icon: 'users.svg', path: '/users' },
        { label: 'Guarantors', icon: 'guarantor.svg' },
        { label: 'Loans', icon: 'loan.svg' },
        { label: 'Decision Models', icon: 'decision_model.svg' },
        { label: 'Savings', icon: 'savings.svg' },
        { label: 'Loan Requests', icon: 'loan_request.svg' },
        { label: 'Whitelist', icon: 'whitlist.svg' },
        { label: 'Karma', icon: 'karma.svg' },
      ]
    },
    {
      section: 'BUSINESSES', items: [
        { label: 'Organization', icon: 'organisation.svg' },
        { label: 'Loan Products', icon: 'loan_products.svg' },
        { label: 'Savings Products', icon: 'saving_products.svg' },
        { label: 'Fees and Charges', icon: 'fees_and_charges.svg' },
        { label: 'Transactions', icon: 'transactions.svg' },
        { label: 'Services', icon: 'services.svg' },
        { label: 'Service Account', icon: 'service_account.svg' },
        { label: 'Settlements', icon: 'settlements.svg' },
        { label: 'Reports', icon: 'reports.svg' },
      ]
    },
    {
      section: 'SETTINGS', items: [
        { label: 'Preferences', icon: 'prefernces.svg' },
        { label: 'Fees and Pricing', icon: 'fees_and_pricing.svg' },
        { label: 'Audit Logs', icon: 'audit_logs.svg' },
      ]
    },
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__content">
          <div className="sidebar__org-switch">
            <img src={`${iconPath}organisation.svg`} alt="" className="sidebar__nav-icon" />
            <span>Switch Organization</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M10.06 0.99L6 5.05L1.94 0.99L1 1.94L6 6.94L11 1.94L10.06 0.99Z" fill="currentColor" /></svg>
          </div>

          {navItems.map((group, gi) => (
            <div key={gi} className="sidebar__nav-section">
              {group.section && <div className="sidebar__section-title">{group.section}</div>}
              {group.items.map((item, ii) => (
                <div
                  key={ii}
                  className={`sidebar__nav-item ${isActive(item.path) ? 'sidebar__nav-item--active' : ''}`}
                  onClick={() => item.path && (navigate(item.path), onClose())}
                >
                  <img src={`${iconPath}${item.icon}`} alt="" className="sidebar__nav-icon" />
                  <span className="sidebar__nav-text">{item.label}</span>
                </div>
              ))}
            </div>
          ))}

          <div className="sidebar__logout">
            <div className="sidebar__nav-item" onClick={handleLogout}>
              <img src={`${iconPath}sign-out.svg`} alt="" className="sidebar__nav-icon" />
              <span className="sidebar__nav-text">Logout</span>
            </div>
          </div>
          <div className="sidebar__version">v1.2.0</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
