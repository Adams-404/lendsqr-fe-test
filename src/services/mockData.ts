// ===========================================
// MOCK DATA GENERATOR - 500 USERS
// ===========================================

import { User, UserStatus, UserStats } from '../types';

const organizations = ['Lendsqr', 'Lendstar', 'Irorun', 'LoanHub', 'QuickCash', 'MoneyFlow'];
const firstNames = ['Grace', 'Debby', 'Tosin', 'Adedeji', 'Chioma', 'Emeka', 'Fatima', 'Ibrahim', 'Joy', 'Kemi', 'Lanre', 'Mercy', 'Ngozi', 'Oluwaseun', 'Peter', 'Queen', 'Rita', 'Samuel', 'Tolu', 'Uche'];
const lastNames = ['Effiom', 'Ogana', 'Dokunmu', 'Adeyemi', 'Okoro', 'Nwankwo', 'Bello', 'Okonkwo', 'Adebayo', 'Chukwu', 'Afolabi', 'Eze', 'Obi', 'Adeleke', 'Nnamdi', 'Olawale', 'Kalu', 'Yusuf', 'Iheanacho', 'Bakare'];

// Profile image for Adedeji - using the exact image provided
import adedejiProfile from '../assets/adedeji-profile.png';
const statuses: UserStatus[] = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
const educationLevels = ['B.Sc', 'M.Sc', 'HND', 'PhD', 'OND'];
const employmentStatuses = ['Employed', 'Self-employed', 'Unemployed', 'Student'];
const sectors = ['FinTech', 'Technology', 'Healthcare', 'Education', 'Banking', 'Oil & Gas', 'Retail'];
const residenceTypes = ["Parent's Apartment", 'Rented Apartment', 'Personal House', 'Shared Apartment'];
const relationships = ['Sister', 'Brother', 'Friend', 'Colleague', 'Parent', 'Spouse'];

function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(',', '');
}

function generatePhoneNumber(): string {
  return `0${Math.floor(Math.random() * 9) + 7}0${Math.floor(10000000 + Math.random() * 89999999)}`;
}

function generateBVN(): string {
  return `${Math.floor(10000000000 + Math.random() * 89999999999)}`;
}

function generateAccountNumber(): string {
  return `${Math.floor(1000000000 + Math.random() * 8999999999)}`;
}

function generateRandomAmount(min: number, max: number): string {
  const amount = Math.floor(Math.random() * (max - min + 1)) + min;
  return `₦${amount.toLocaleString()}.00`;
}

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUser(index: number): User {
  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  const fullName = `${firstName} ${lastName}`;
  const organization = getRandomItem(organizations);
  const email = `${firstName.toLowerCase()}@${organization.toLowerCase()}.com`;
  const username = `${firstName} ${lastName}`;
  const phoneNumber = generatePhoneNumber();
  const lsqId = `LSQf${Math.random().toString(36).substring(2, 10)}`;
  
  const guarantor1FirstName = getRandomItem(firstNames);
  const guarantor1LastName = getRandomItem(lastNames);
  const guarantor2FirstName = getRandomItem(firstNames);
  const guarantor2LastName = getRandomItem(lastNames);

  // Use Adedeji's profile image if name is Adedeji
  const profileImage = firstName === 'Adedeji' ? adedejiProfile : undefined;

  return {
    id: `user-${index + 1}`,
    organization,
    profileImage,
    username,
    email,
    phoneNumber,
    dateJoined: generateRandomDate(new Date(2019, 0, 1), new Date(2020, 11, 31)),
    status: getRandomItem(statuses),
    personalInfo: {
      fullName,
      phoneNumber,
      emailAddress: email,
      bvn: generateBVN(),
      gender: Math.random() > 0.5 ? 'Female' : 'Male',
      maritalStatus: getRandomItem(['Single', 'Married', 'Divorced', 'Widowed']),
      children: getRandomItem(['None', '1', '2', '3', '4+']),
      typeOfResidence: getRandomItem(residenceTypes),
    },
    educationEmployment: {
      levelOfEducation: getRandomItem(educationLevels),
      employmentStatus: getRandomItem(employmentStatuses),
      sectorOfEmployment: getRandomItem(sectors),
      durationOfEmployment: `${Math.floor(Math.random() * 10) + 1} years`,
      officeEmail: `${firstName.toLowerCase()}@${organization.toLowerCase()}.com`,
      monthlyIncome: `₦${(Math.floor(Math.random() * 8) + 2) * 50000}.00 - ₦${(Math.floor(Math.random() * 10) + 10) * 50000}.00`,
      loanRepayment: `${Math.floor(Math.random() * 100000) + 10000}`,
    },
    socials: {
      twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      facebook: `${firstName} ${lastName}`,
      instagram: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    },
    guarantors: [
      {
        fullName: `${guarantor1FirstName} ${guarantor1LastName}`,
        phoneNumber: generatePhoneNumber(),
        emailAddress: `${guarantor1FirstName.toLowerCase()}@gmail.com`,
        relationship: getRandomItem(relationships),
      },
      {
        fullName: `${guarantor2FirstName} ${guarantor2LastName}`,
        phoneNumber: generatePhoneNumber(),
        emailAddress: `${guarantor2FirstName.toLowerCase()}@gmail.com`,
        relationship: getRandomItem(relationships),
      },
    ],
    accountBalance: generateRandomAmount(10000, 500000),
    accountNumber: generateAccountNumber(),
    bankName: getRandomItem(['Providus Bank', 'Access Bank', 'GTBank', 'First Bank', 'Zenith Bank', 'UBA']),
    userTier: Math.floor(Math.random() * 3) + 1,
    lsqId,
  };
}

// Generate 500 users
const mockUsers: User[] = Array.from({ length: 500 }, (_, i) => generateUser(i));

// Cache the users
let cachedUsers: User[] | null = null;

export const getUsers = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!cachedUsers) {
    cachedUsers = mockUsers;
  }
  
  return cachedUsers;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockUsers.find(user => user.id === id);
};

export const getUserStats = async (): Promise<UserStats> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const users = await getUsers();
  
  return {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'Active').length,
    usersWithLoans: Math.floor(users.length * 0.25),
    usersWithSavings: Math.floor(users.length * 0.4),
  };
};

export const filterUsers = (users: User[], filters: Partial<{
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}>): User[] => {
  return users.filter(user => {
    if (filters.organization && user.organization.toLowerCase() !== filters.organization.toLowerCase()) {
      return false;
    }
    if (filters.username && !user.username.toLowerCase().includes(filters.username.toLowerCase())) {
      return false;
    }
    if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) {
      return false;
    }
    if (filters.phoneNumber && !user.phoneNumber.includes(filters.phoneNumber)) {
      return false;
    }
    if (filters.status && user.status.toLowerCase() !== filters.status.toLowerCase()) {
      return false;
    }
    return true;
  });
};

export default mockUsers;
