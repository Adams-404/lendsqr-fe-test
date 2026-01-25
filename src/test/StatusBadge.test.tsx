import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge/StatusBadge';

describe('StatusBadge', () => {
  it('renders Active status correctly', () => {
    render(<StatusBadge status="Active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders Inactive status correctly', () => {
    render(<StatusBadge status="Inactive" />);
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('renders Pending status correctly', () => {
    render(<StatusBadge status="Pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('renders Blacklisted status correctly', () => {
    render(<StatusBadge status="Blacklisted" />);
    expect(screen.getByText('Blacklisted')).toBeInTheDocument();
  });

  it('applies correct CSS class for Active status', () => {
    render(<StatusBadge status="Active" />);
    const badge = screen.getByText('Active');
    expect(badge).toHaveClass('status-badge--active');
  });
});
