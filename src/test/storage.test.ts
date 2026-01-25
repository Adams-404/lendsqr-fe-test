import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from '../utils/storage';

describe('Storage Utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save and retrieve user', () => {
    const mockUser = {
      id: 'test-1',
      organization: 'Test Org',
      username: 'Test User',
      email: 'test@test.com',
      phoneNumber: '1234567890',
      dateJoined: '2024-01-01',
      status: 'Active' as const,
      personalInfo: {
        fullName: 'Test User',
        phoneNumber: '1234567890',
        emailAddress: 'test@test.com',
        bvn: '12345678901',
        gender: 'Male',
        maritalStatus: 'Single',
        children: 'None',
        typeOfResidence: 'Rented',
      },
      educationEmployment: {
        levelOfEducation: 'B.Sc',
        employmentStatus: 'Employed',
        sectorOfEmployment: 'Tech',
        durationOfEmployment: '2 years',
        officeEmail: 'test@work.com',
        monthlyIncome: '₦200,000',
        loanRepayment: '50000',
      },
      socials: { twitter: '@test', facebook: 'Test', instagram: '@test' },
      guarantors: [],
      accountBalance: '₦100,000',
      accountNumber: '1234567890',
      bankName: 'Test Bank',
      userTier: 2,
      lsqId: 'LSQ123',
    };

    storage.saveUser(mockUser);
    const retrieved = storage.getUser();
    expect(retrieved?.id).toBe('test-1');
  });

  it('should return null for non-existent user', () => {
    const user = storage.getUser();
    expect(user).toBeNull();
  });

  it('should set and get auth state', () => {
    storage.setAuthState(true);
    expect(storage.getAuthState()).toBe(true);
    
    storage.setAuthState(false);
    expect(storage.getAuthState()).toBe(false);
  });

  it('should clear auth state', () => {
    storage.setAuthState(true);
    storage.clearAuthState();
    expect(storage.getAuthState()).toBe(false);
  });
});
