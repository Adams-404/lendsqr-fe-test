import React from 'react';
import logo from '../../assets/logo.svg';
import adedejiProfile from '../../assets/adedeji-profile.png';
import './Header.scss';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Lendsqr Logo" />
      </div>

      <div className="header__content">
        <div className="header__search">
          <input
            type="text"
            className="header__search-input"
            placeholder="Search for anything"
          />
          <button className="header__search-btn">
            <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 13L9 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="header__right">
          <a href="#" className="header__docs-link">Docs</a>

          <div className="header__notification">
            <svg viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 8.5C17.5 6.77609 16.8152 5.12279 15.5962 3.90381C14.3772 2.68482 12.7239 2 11 2C9.27609 2 7.62279 2.68482 6.40381 3.90381C5.18482 5.12279 4.5 6.77609 4.5 8.5C4.5 15.5 1 17.5 1 17.5H21C21 17.5 17.5 15.5 17.5 8.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.73 21.5C12.5542 21.7526 12.3176 21.9548 12.0416 22.0889C11.7656 22.223 11.459 22.2845 11.1499 22.2677C10.8408 22.2509 10.5425 22.1562 10.2826 21.9925C10.0226 21.8289 9.80958 21.6018 9.66211 21.3311" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="header__profile">
            <img
              src={adedejiProfile}
              alt="Adedeji Profile"
              className="header__avatar"
            />
            <span className="header__name">
              Adedeji
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>

          <button className="header__mobile-menu-btn" onClick={onMenuToggle}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
