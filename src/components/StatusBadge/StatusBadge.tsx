import React from 'react';
import { UserStatus } from '../../types';
import './StatusBadge.scss';

interface StatusBadgeProps {
  status: UserStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`status-badge status-badge--${status.toLowerCase()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
