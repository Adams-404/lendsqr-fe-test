import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FilterOptions } from '../../types';
import { storage } from '../../utils/storage';
import StatusBadge from '../StatusBadge';
import FilterDropdown from '../FilterDropdown';
import './UsersTable.scss';

interface UsersTableProps {
  users: User[];
  onFilter: (filters: Partial<FilterOptions>) => void;
  onResetFilter: () => void;
  organizations: string[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onFilter, onResetFilter, organizations }) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const filterRef = useRef<HTMLTableCellElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setActiveFilter(null);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleViewDetails = (user: User) => {
    storage.saveUser(user);
    navigate(`/users/${user.id}`);
    setActiveMenu(null);
  };

  const toggleFilter = (column: string) => {
    setActiveFilter(activeFilter === column ? null : column);
  };

  const toggleMenu = (userId: string) => {
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  const columns = [
    { key: 'organization', label: 'Organization' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'dateJoined', label: 'Date Joined' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="users-table">
      <div className="users-table__wrapper">
        <table className="users-table__table">
          <thead className="users-table__header">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="users-table__header-cell"
                  ref={activeFilter === column.key ? filterRef : undefined}
                >
                  <div
                    className="users-table__header-cell-content"
                    onClick={() => toggleFilter(column.key)}
                  >
                    {column.label}
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.22222 13.3333H9.77778V11.5556H6.22222V13.3333ZM0 2.66667V4.44444H16V2.66667H0ZM2.66667 8.88889H13.3333V7.11111H2.66667V8.88889Z" fill="currentColor"/>
                    </svg>
                  </div>
                  {activeFilter === column.key && (
                    <FilterDropdown
                      onFilter={(filters) => {
                        onFilter(filters);
                        setActiveFilter(null);
                      }}
                      onReset={() => {
                        onResetFilter();
                        setActiveFilter(null);
                      }}
                      organizations={organizations}
                    />
                  )}
                </th>
              ))}
              <th className="users-table__header-cell"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="users-table__body-row">
                <td className="users-table__cell">{user.organization}</td>
                <td className="users-table__cell">{user.username}</td>
                <td className="users-table__cell">{user.email}</td>
                <td className="users-table__cell">{user.phoneNumber}</td>
                <td className="users-table__cell">{user.dateJoined}</td>
                <td className="users-table__cell">
                  <StatusBadge status={user.status} />
                </td>
                <td className="users-table__cell users-table__actions">
                  <div ref={activeMenu === user.id ? menuRef : undefined}>
                    <button
                      className="users-table__actions-btn"
                      onClick={() => toggleMenu(user.id)}
                    >
                      <svg viewBox="0 0 4 16" fill="currentColor">
                        <circle cx="2" cy="2" r="2"/>
                        <circle cx="2" cy="8" r="2"/>
                        <circle cx="2" cy="14" r="2"/>
                      </svg>
                    </button>
                    {activeMenu === user.id && (
                      <div className="users-table__actions-menu">
                        <div
                          className="users-table__actions-item"
                          onClick={() => handleViewDetails(user)}
                        >
                          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.666656 8C0.666656 8 3.33332 2.66667 7.99999 2.66667C12.6667 2.66667 15.3333 8 15.3333 8C15.3333 8 12.6667 13.3333 7.99999 13.3333C3.33332 13.3333 0.666656 8 0.666656 8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          View Details
                        </div>
                        <div className="users-table__actions-item">
                          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14.6667 8C14.6667 8 12 2.66667 8 2.66667C4 2.66667 1.33333 8 1.33333 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 13.3333C4 13.3333 1.33333 8 1.33333 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11.3333 12.6667L14.6667 16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Blacklist User
                        </div>
                        <div className="users-table__actions-item">
                          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1.33333 8C1.33333 8 4 2.66667 8 2.66667C12 2.66667 14.6667 8 14.6667 8C14.6667 8 12 13.3333 8 13.3333C4 13.3333 1.33333 8 1.33333 8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Activate User
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
