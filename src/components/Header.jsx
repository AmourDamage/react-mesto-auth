import React from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ userData }) {
  const location = useLocation();

  function signOut() {
    localStorage.removeItem('token');
  }

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип" />
      <div className="header__email-wrapper">
        {location.pathname === '/sign-in' && (
          <Link to="/sign-up" className="header__email-link">
            Регистрация
          </Link>
        )}

        {location.pathname === '/sign-up' && (
          <Link to="/sign-in" className="header__email-link">
            Вход
          </Link>
        )}

        {location.pathname === '/' && (
          <div className="header__email-wrapper">
            <p>{userData}</p>
            <Link onClick={signOut} to="/sign-in" className="header__email-link">
              Выход
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
