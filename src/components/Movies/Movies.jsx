import React, {useEffect, useState} from 'react';
import './Movies.css';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import getFilms from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

import {MOVVIES_MESSAGE, NOT_FOUND_MESSAGE} from '../../utils/constants';
import {searchFilter} from "../../utils/utils";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {useLocation} from "react-router-dom";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [inputValue, setInputValue] = useState('');
    const [shorts, setShorts] = useState(false);
    const [placeholderContent, setPlaceholderContent] = useState('Фильм');
    const [error, setError] = useState(false);

    const {pathname} = useLocation();


    const filter = (query, shorts) => {
        const storedMovies = JSON.parse(localStorage.getItem('movies'));
        const filtered = searchFilter(storedMovies, query, shorts);

        if (filtered.length === 0) {
            setErrorMessage(NOT_FOUND_MESSAGE);
        }

        setMovies(filtered);
        setLoading(false);
    };

    const handleSearch = (query, shorts) => {
        setLoading(true);
        setErrorMessage('');
        const storedMovies = JSON.parse(localStorage.getItem('movies'));
        if (!storedMovies) {
            getFilms()
                .then((movies) => {
                    localStorage.setItem('movies', JSON.stringify(movies));
                    filter(query, shorts);
                })
                .catch(() => {
                    setErrorMessage(MOVVIES_MESSAGE);
                });
        } else {
            filter(query, shorts);
        }
    };

    useEffect(() => {
        const savedMovies = localStorage.getItem('savedMovies');

        if (!savedMovies) {
            setLoading(true);

            mainApi.getFilms()
                .then((films) => {
                    if (films.length > 0) {
                        localStorage.setItem('savedMovies', JSON.stringify(films));
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setErrorMessage(MOVVIES_MESSAGE);
                });
        }
    }, []);


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
        <div className="movies">
            <Header/>
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
                ? <Preloader/>
                : <MoviesCardList movies={movies} errorMessage={errorMessage}/>}
            <Footer/>
        </div>
    );
}
