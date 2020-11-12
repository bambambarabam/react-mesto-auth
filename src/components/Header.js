import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ onSignOut, userEmail, loggedIn, headerName }) {
  return (
    <header className="header">
      <img
        src={logo}
        className="header__logo"
        alt="Логотип."
      />
      <div className={`${loggedIn ? "header__info" : "header__status"}`}>
        <p className="header__user">{userEmail}</p>
        <p className="header__out" onClick={onSignOut}>Выйти</p>
      </div>
      <Link to={`${headerName === "Регистрация" ? "/signup" : "/signin"}`}
        className={`${loggedIn ? "header__status" : "header__name"}`}>
        {headerName}
      </Link>
    </header>
  );
}

export default Header;
