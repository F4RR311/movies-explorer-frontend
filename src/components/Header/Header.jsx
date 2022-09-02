import React, { useContext } from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import UnauthLinks from '../UnauthLinks/UnauthLinks';
import Navigation from '../Navigation/Navigation';
import UserContext from '../../contexts/UserContext';

export default function Header() {
  const { currentUser } = useContext(UserContext);

  return (
      <header className="header">

        <Logo />
        {currentUser._id ? <Navigation /> : <UnauthLinks />}

      </header>

  );
}
