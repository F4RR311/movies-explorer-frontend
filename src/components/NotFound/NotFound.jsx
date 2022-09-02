import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <section className="page-not-found">
            <h1 className="page-not-found__text page-not-found__heading">404</h1>
            <p className="page-not-found__text">Страница не найдена</p>
            <button
                className="page-not-found__text page-not-found__back-button"
                onClick={handleGoBack}
                type="button"
            >
                Назад
            </button>
        </section>
    );
}
