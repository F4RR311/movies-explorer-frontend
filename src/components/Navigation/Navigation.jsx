import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
    const [open, setOpen] = useState(false);

    const handleOpenMenu = () => {
        setOpen(true);
    };

    const handleCloseMenu = () => {
        setOpen(false);
    };

    return (
        <nav className="navigation">
            <ul className={`navigation__links ${open && 'navigation__links_opened'}`}>
                <button
                    className="navigation__button navigation__close-button"
                    type="button"
                    aria-label="Закрыть"
                    onClick={handleCloseMenu}
                />

                <li className="navigation__link-item">
                    <Link to="/" className="navigation__link navigation__link_hidden">Главная</Link>
                </li>
                <li className="navigation__link-item">
                    <Link to="/movies" className="navigation__link account__link_marked">Фильмы</Link>
                </li>
                <li className="navigation__link-item">
                    <Link to="/saved-movies" className="navigation__link">Сохранённые&nbsp;фильмы</Link>
                </li>
                <li className="navigation__link-item account">
                    <Link to="/profile" className="account__link account__link_marked">
                        <div className="account__icon" />
                        <p className="account__text">Аккаунт</p>
                    </Link>
                </li>
            </ul>

            <button
                className="navigation__button navigation__show-button"
                type="button"
                aria-label="Меню"
                onClick={handleOpenMenu}
            />
        </nav>
    );
}
