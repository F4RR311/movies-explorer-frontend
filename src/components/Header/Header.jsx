import React, { useContext } from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import UnauthLinks from '../UnauthLinks/UnauthLinks';
import Navigation from '../Navigation/Navigation';
import UserContext from '../../contexts/CurrentUserContext';

export default function Header() {
  const { currentUser } = useContext(UserContext);

  return (
      <header className="header">
          <div className="header__container">
        <Logo />
        {currentUser._id ? <Navigation /> : <UnauthLinks />}
          </div>
      </header>

  );
}
