import React from 'react';
import { Link } from 'react-router-dom';
import './UnauthLinks.css';

export default function UnauthLinks() {
  return (
    <nav>
      <ul className="unauth-links">
        <li className="unauth-links__link-item">
          <Link to="/signup" className="unauth-links__link">Регистрация</Link>
        </li>
        <li className="unauth-links__link-item unauth-links__link-item_color_green">
          <Link to="/signin" className="unauth-links__link">Войти</Link>
        </li>
      </ul>
    </nav>
  );
}
