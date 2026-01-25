import React from 'react';
import './StatCard.scss';

type CardType = 'users' | 'active' | 'loans' | 'savings';

interface StatCardProps {
  type: CardType;
  label: string;
  value: string | number;
}

// Icon paths from Figma design
const iconPaths: Record<CardType, string> = {
  users: '/icons/stat_users.svg',
  active: '/icons/active_users.svg',
  loans: '/icons/users_with_loan.svg',
  savings: '/icons/users_with_savings.svg',
};

const StatCard: React.FC<StatCardProps> = ({ type, label, value }) => {
  return (
    <div className="stat-card">
      <div className="stat-card__icon">
        <img src={iconPaths[type]} alt="" />
      </div>
      <div className="stat-card__label">{label}</div>
      <div className="stat-card__value">{typeof value === 'number' ? value.toLocaleString() : value}</div>
    </div>
  );
};

export default StatCard;
