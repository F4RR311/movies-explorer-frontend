import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm({ handleSearch }) {
    const [inputValue, setInputValue] = useState('');
    const [shorts, setShorts] = useState(false);

    const [placeholderContent, setPlaceholderContent] = useState('Фильм');
    const [error, setError] = useState(false);

    const { pathname } = useLocation();

    const handleInput = (evt) => {
        setInputValue(evt.target.value);
    };

    const handleCheckbox = () => {
        setShorts(!shorts);
        localStorage.setItem('shorts', !shorts);
        handleSearch(inputValue, !shorts);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (!inputValue) {
            setError(true);
            setPlaceholderContent('Нужно ввести ключевое слово');
            evt.target.elements['search-query'].focus();
            return;
        }

        setError(false);
        setPlaceholderContent('Фильм');

        localStorage.setItem('query', inputValue);

        handleSearch(inputValue, shorts);
    };

    useEffect(() => {
        if (pathname === '/movies') {
            const savedInputValue = localStorage.getItem('query');
            const savedShorts = JSON.parse(localStorage.getItem('shorts'));

            if (savedInputValue) {
                setInputValue(savedInputValue);
            }

            if (savedShorts) {
                setShorts(savedShorts);
            }

            if (savedInputValue || (savedShorts === true)) {
                handleSearch(savedInputValue, savedShorts);
            }
        }
    }, []);

    return (
        <form className="search-form" name="search" onSubmit={handleSubmit} noValidate>
            <div className="search-form__container">
                <label className="search-form__label" htmlFor="search-query">
                    <div className="search-form__icon" htmlFor="search-query" />
                    <input
                        className={`search-form__input ${error && 'search-form__input_error'} search-form__text`}
                        id="search-query"
                        name="search-query"
                        type="text"
                        placeholder={placeholderContent}
                        onChange={handleInput}
                        value={inputValue}
                        required
                    />
                </label>
                <button className="search-form__button" type="submit" aria-label="Искать" />
            </div>
            <label className="search-form__checkbox" htmlFor="shorts">
                <FilterCheckbox
                    value={shorts}
                    onChange={handleCheckbox}
                />
                <span className="search-form__text">Короткометражки</span>
            </label>
        </form>
    );
}
