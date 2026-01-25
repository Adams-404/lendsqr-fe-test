import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/StatCard';
import UsersTable from '../../components/UsersTable';
import Pagination from '../../components/Pagination';
import { User, FilterOptions, UserStats } from '../../types';
import { getUsers, getUserStats, filterUsers } from '../../services/mockData';
import './Users.scss';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeFilters, setActiveFilters] = useState<Partial<FilterOptions>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, statsData] = await Promise.all([
          getUsers(),
          getUserStats(),
        ]);
        setUsers(usersData);
        setFilteredUsers(usersData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const organizations = useMemo(() => {
    const orgs = [...new Set(users.map(user => user.organization))];
    return orgs.sort();
  }, [users]);

  const handleFilter = (filters: Partial<FilterOptions>) => {
    setActiveFilters(filters);
    const filtered = filterUsers(users, filters);
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setActiveFilters({});
    setFilteredUsers(users);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="users-page">
          <div className="users-page__loading">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="users-page">
        <h1 className="users-page__title">Users</h1>

        <div className="users-page__stats">
          <StatCard type="users" label="USERS" value={stats?.totalUsers || 0} />
          <StatCard type="active" label="ACTIVE USERS" value={stats?.activeUsers || 0} />
          <StatCard type="loans" label="USERS WITH LOANS" value={stats?.usersWithLoans || 0} />
          <StatCard type="savings" label="USERS WITH SAVINGS" value={stats?.usersWithSavings || 0} />
        </div>

        <UsersTable
          users={paginatedUsers}
          onFilter={handleFilter}
          onResetFilter={handleResetFilter}
          organizations={organizations}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredUsers.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </DashboardLayout>
  );
};

export default Users;
