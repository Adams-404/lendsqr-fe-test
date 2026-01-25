import React, { useState } from 'react';
import { FilterOptions } from '../../types';
import './FilterDropdown.scss';

interface FilterDropdownProps {
  onFilter: (filters: Partial<FilterOptions>) => void;
  onReset: () => void;
  organizations: string[];
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilter, onReset, organizations }) => {
  const [filters, setFilters] = useState<Partial<FilterOptions>>({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  });

  const handleChange = (field: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: '',
    });
    onReset();
  };

  return (
    <div className="filter-dropdown">
      <form className="filter-dropdown__form" onSubmit={handleSubmit}>
        <div className="filter-dropdown__field">
          <label className="filter-dropdown__label">Organization</label>
          <select
            className="filter-dropdown__select"
            value={filters.organization}
            onChange={(e) => handleChange('organization', e.target.value)}
          >
            <option value="">Select</option>
            {organizations.map(org => (
              <option key={org} value={org}>{org}</option>
            ))}
          </select>
        </div>

        <div className="filter-dropdown__field">
          <label className="filter-dropdown__label">Username</label>
          <input
            type="text"
            className="filter-dropdown__input"
            placeholder="User"
            value={filters.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />
        </div>

        <div className="filter-dropdown__field">
          <label className="filter-dropdown__label">Email</label>
          <input
            type="email"
            className="filter-dropdown__input"
            placeholder="Email"
            value={filters.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="filter-dropdown__field">
          <label className="filter-dropdown__label">Date</label>
          <input
            type="date"
            className="filter-dropdown__input-date"
            value={filters.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
        </div>

        <div className="filter-dropdown__field">
          <label className="filter-dropdown__label">Phone Number</label>
          <input
            type="text"
            className="filter-dropdown__input"
            placeholder="Phone Number"
            value={filters.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
          />
        </div>

        <div className="filter-dropdown__field">
          <label className="filter-dropdown__label">Status</label>
          <select
            className="filter-dropdown__select"
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>

        <div className="filter-dropdown__actions">
          <button type="button" className="filter-dropdown__btn-reset" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="filter-dropdown__btn-filter">
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterDropdown;
