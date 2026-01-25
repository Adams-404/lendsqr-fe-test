import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { User } from '../../types';
import { storage } from '../../utils/storage';
import { getUserById } from '../../services/mockData';
import './UserDetails.scss';

type TabType = 'general' | 'documents' | 'bank' | 'loans' | 'savings' | 'app';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('general');

  useEffect(() => {
    const loadUser = async () => {
      // First try to get from localStorage (persisted)
      const storedUser = storage.getUser();

      if (storedUser && storedUser.id === id) {
        setUser(storedUser);
        setLoading(false);
        return;
      }

      // If not in storage, fetch from mock API
      try {
        const userData = await getUserById(id || '');
        if (userData) {
          setUser(userData);
          storage.saveUser(userData);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const handleBack = () => {
    navigate('/users');
  };

  const renderStars = (tier: number) => {
    return Array.from({ length: 3 }, (_, index) => (
      <svg
        key={index}
        viewBox="0 0 16 16"
        fill={index < tier ? '#E9B200' : 'none'}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0L10.3511 4.76393L15.6085 5.52786L11.8042 9.23607L12.7023 14.4721L8 12L3.29772 14.4721L4.19577 9.23607L0.391548 5.52786L5.64886 4.76393L8 0Z"
          stroke="#E9B200"
          strokeWidth="1"
        />
      </svg>
    ));
  };

  const tabs: { key: TabType; label: string }[] = [
    { key: 'general', label: 'General Details' },
    { key: 'documents', label: 'Documents' },
    { key: 'bank', label: 'Bank Details' },
    { key: 'loans', label: 'Loans' },
    { key: 'savings', label: 'Savings' },
    { key: 'app', label: 'App and System' },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="user-details">
          <div className="user-details__loading">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="user-details">
          <div className="user-details__not-found">
            <p>User not found</p>
            <Link to="/users">Back to Users</Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="user-details">
        <div className="user-details__back" onClick={handleBack}>
          <svg viewBox="0 0 30 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.469669 5.46967C0.176777 5.76256 0.176777 6.23744 0.469669 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.6967C6.01041 0.403807 5.53553 0.403807 5.24264 0.6967L0.469669 5.46967ZM30 5.25L1 5.25V6.75L30 6.75V5.25Z" fill="currentColor" />
          </svg>
          Back to Users
        </div>

        <div className="user-details__header">
          <h1 className="user-details__title">User Details</h1>
          <div className="user-details__actions">
            <button className="user-details__btn-blacklist">Blacklist User</button>
            <button className="user-details__btn-activate">Activate User</button>
          </div>
        </div>

        <div className="user-details__profile-card">
          <div className="user-details__profile-top">
            <div className="user-details__avatar">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 20C25.5228 20 30 15.5228 30 10C30 4.47715 25.5228 0 20 0C14.4772 0 10 4.47715 10 10C10 15.5228 14.4772 20 20 20ZM20 25C13.325 25 0 28.35 0 35V40H40V35C40 28.35 26.675 25 20 25Z" fill="currentColor" />
              </svg>
            </div>
            <div className="user-details__info">
              <h2 className="user-details__name">{user.personalInfo.fullName}</h2>
              <p className="user-details__id">{user.lsqId}</p>
            </div>
            <div className="user-details__tier">
              <p className="user-details__tier-label">User's Tier</p>
              <div className="user-details__tier-stars">
                {renderStars(user.userTier)}
              </div>
            </div>
            <div className="user-details__balance-section">
              <p className="user-details__balance">{user.accountBalance}</p>
              <p className="user-details__bank">{user.accountNumber}/{user.bankName}</p>
            </div>
          </div>

          <div className="user-details__tabs">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`user-details__tab ${activeTab === tab.key ? 'user-details__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="user-details__content">
          {activeTab === 'general' && (
            <>
              <div className="user-details__section">
                <h3 className="user-details__section-title">Personal Information</h3>
                <div className="user-details__grid">
                  <div className="user-details__field">
                    <span className="user-details__label">Full Name</span>
                    <span className="user-details__value">{user.personalInfo.fullName}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">Phone Number</span>
                    <span className="user-details__value">{user.personalInfo.phoneNumber}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">Email Address</span>
                    <span className="user-details__value">{user.personalInfo.emailAddress}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">BVN</span>
                    <span className="user-details__value">{user.personalInfo.bvn}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">Gender</span>
                    <span className="user-details__value">{user.personalInfo.gender}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">Marital Status</span>
                    <span className="user-details__value">{user.personalInfo.maritalStatus}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">Children</span>
                    <span className="user-details__value">{user.personalInfo.children}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">Type of Residence</span>
                    <span className="user-details__value">{user.personalInfo.typeOfResidence}</span>
                  </div>
                </div>
              </div>

              <div className="user-details__section">
                <h3 className="user-details__section-title">Education and Employment</h3>
                <div className="user-details__grid">
                  <div className="user-details__field">
                    <span className="user-details__label">Level of Education</span>
                    <span className="user-details__value">{user.educationEmployment.levelOfEducation}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">Employment Status</span>
                    <span className="user-details__value">{user.educationEmployment.employmentStatus}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">Sector of Employment</span>
                    <span className="user-details__value">{user.educationEmployment.sectorOfEmployment}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">Duration of Employment</span>
                    <span className="user-details__value">{user.educationEmployment.durationOfEmployment}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">Office Email</span>
                    <span className="user-details__value">{user.educationEmployment.officeEmail}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">Monthly Income</span>
                    <span className="user-details__value">{user.educationEmployment.monthlyIncome}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">Loan Repayment</span>
                    <span className="user-details__value">{user.educationEmployment.loanRepayment}</span>
                  </div>
                </div>
              </div>

              <div className="user-details__section">
                <h3 className="user-details__section-title">Socials</h3>
                <div className="user-details__grid">
                  <div className="user-details__field">
                    <span className="user-details__label">Twitter</span>
                    <span className="user-details__value">{user.socials.twitter}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">Facebook</span>
                    <span className="user-details__value">{user.socials.facebook}</span>
                  </div>
                  <div className="user-details__field">
                    <span className="user-details__label">Instagram</span>
                    <span className="user-details__value">{user.socials.instagram}</span>
                  </div>
                </div>
              </div>

              <div className="user-details__section">
                <h3 className="user-details__section-title">Guarantor</h3>
                {user.guarantors.map((guarantor, index) => (
                  <div key={index} className={`user-details__grid ${index < user.guarantors.length - 1 ? 'user-details__grid--with-separator' : ''}`}>
                    <div className="user-details__field">
                      <span className="user-details__label">Full Name</span>
                      <span className="user-details__value">{guarantor.fullName}</span>
                    </div>
                    <div className="user-details__field">
                      <span className="user-details__label">Phone Number</span>
                      <span className="user-details__value">{guarantor.phoneNumber}</span>
                    </div>
                    <div className="user-details__field">
                      <span className="user-details__label">Email Address</span>
                      <span className="user-details__value">{guarantor.emailAddress}</span>
                    </div>
                    <div className="user-details__field">
                      <span className="user-details__label">Relationship</span>
                      <span className="user-details__value">{guarantor.relationship}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'documents' && (
            <div className="user-details__section">
              <h3 className="user-details__section-title">Documents</h3>
              <p className="user-details__empty-message">No documents available</p>
            </div>
          )}

          {activeTab === 'bank' && (
            <div className="user-details__section">
              <h3 className="user-details__section-title">Bank Details</h3>
              <div className="user-details__grid">
                <div className="user-details__field">
                  <span className="user-details__label">Bank Name</span>
                  <span className="user-details__value">{user.bankName}</span>
                </div>
                <div className="user-details__field">
                  <span className="user-details__label">Account Number</span>
                  <span className="user-details__value">{user.accountNumber}</span>
                </div>
                <div className="user-details__field">
                  <span className="user-details__label">Account Balance</span>
                  <span className="user-details__value">{user.accountBalance}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'loans' && (
            <div className="user-details__section">
              <h3 className="user-details__section-title">Loans</h3>
              <div className="user-details__grid">
                <div className="user-details__field">
                  <span className="user-details__label">Loan Repayment</span>
                  <span className="user-details__value">₦{user.educationEmployment.loanRepayment}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'savings' && (
            <div className="user-details__section">
              <h3 className="user-details__section-title">Savings</h3>
              <p className="user-details__empty-message">No savings data available</p>
            </div>
          )}

          {activeTab === 'app' && (
            <div className="user-details__section">
              <h3 className="user-details__section-title">App and System</h3>
              <div className="user-details__grid">
                <div className="user-details__field">
                  <span className="user-details__label">User ID</span>
                  <span className="user-details__value">{user.id}</span>
                </div>
                <div className="user-details__field">
                  <span className="user-details__label">LSQ ID</span>
                  <span className="user-details__value">{user.lsqId}</span>
                </div>
                <div className="user-details__field">
                  <span className="user-details__label">Date Joined</span>
                  <span className="user-details__value">{user.dateJoined}</span>
                </div>
                <div className="user-details__field">
                  <span className="user-details__label">Status</span>
                  <span className="user-details__value">{user.status}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDetails;
