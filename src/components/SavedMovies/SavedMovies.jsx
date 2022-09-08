import React, { useState, useEffect, useContext } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';

import TooltipContext from '../../contexts/TooltipContext';
import { NO_CONNECTION_MESSAGE, NOT_FOUND_MESSAGE } from '../../utils/constants';
import './SavedMovies.css';
import {searchFilter} from "../../utils/utils";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SavedMovies() {
    const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [inputValue, setInputValue] = useState('');
    const [shorts, setShorts] = useState(false);

    const [placeholderContent, setPlaceholderContent] = useState('Фильм');
    const [error, setError] = useState(false);

    const { setTooltipMessage } = useContext(TooltipContext);

    const handleSearch = (query, isShort) => {
        setLoading(true);
        setErrorMessage('');

        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

        const filtered = searchFilter(savedMovies, query, isShort);

        if (filtered.length === 0) {
            setErrorMessage(NOT_FOUND_MESSAGE);
        }

        setMovies(filtered);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        mainApi.getFilms()
            .then((savedMovies) => {
                const user = localStorage.getItem('userId');
                const ownMovies = savedMovies.filter((film) => film.owner === user);
                localStorage.setItem('savedMovies', JSON.stringify(ownMovies));
                setLoading(false);
            })
            .catch(() => setTooltipMessage(NO_CONNECTION_MESSAGE));
    }, []);

    const handleInput = (evt) => {
        setInputValue(evt.target.value);
    };

    const handleCheckbox = () => {
        setShorts(!shorts);
        localStorage.getItem('shorts', !shorts);
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
        localStorage.setItem('query-saved', inputValue);
        handleSearch(inputValue, shorts);
    };


    return (
        <div className="saved-movies">
            <Header />
            <form className="search-form" name="search" onSubmit={handleSubmit} noValidate>
                <div className="search-form__container">
                    <label className="search-form__label" htmlFor="search-query">
                        <div className="search-form__icon" htmlFor="search-query"/>
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
                    <button className="search-form__button" type="submit" aria-label="Искать"/>
                </div>
                <label className="search-form__checkbox" htmlFor="shorts">
                    <FilterCheckbox
                        value={shorts}
                        onChange={handleCheckbox}
                    />
                    <span className="search-form__text">Короткометражки</span>
                </label>
            </form>
            {loading
                ? <Preloader />
                : <MoviesCardList movies={movies} errorMessage={errorMessage} />}
            <Footer />
        </div>
    );
}
