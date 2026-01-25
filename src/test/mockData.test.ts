import { describe, it, expect } from 'vitest';
import { getUsers, getUserById, getUserStats, filterUsers } from '../services/mockData';

describe('Mock Data Service', () => {
  it('should return 500 users', async () => {
    const users = await getUsers();
    expect(users).toHaveLength(500);
  });

  it('should return user by ID', async () => {
    const user = await getUserById('user-1');
    expect(user).toBeDefined();
    expect(user?.id).toBe('user-1');
  });

  it('should return undefined for non-existent user', async () => {
    const user = await getUserById('non-existent-id');
    expect(user).toBeUndefined();
  });

  it('should return user stats', async () => {
    const stats = await getUserStats();
    expect(stats.totalUsers).toBe(500);
    expect(stats.activeUsers).toBeGreaterThan(0);
    expect(stats.usersWithLoans).toBeGreaterThan(0);
    expect(stats.usersWithSavings).toBeGreaterThan(0);
  });

  it('should filter users by organization', async () => {
    const users = await getUsers();
    const filtered = filterUsers(users, { organization: 'Lendsqr' });
    expect(filtered.every(u => u.organization === 'Lendsqr')).toBe(true);
  });

  it('should filter users by status', async () => {
    const users = await getUsers();
    const filtered = filterUsers(users, { status: 'Active' });
    expect(filtered.every(u => u.status === 'Active')).toBe(true);
  });

  it('should return all users when no filters applied', async () => {
    const users = await getUsers();
    const filtered = filterUsers(users, {});
    expect(filtered).toHaveLength(500);
  });
});
