import React, { useEffect, useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import getFilms from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

import { MOVVIES_MESSAGE, NOT_FOUND_MESSAGE } from '../../utils/constants';
import {searchFilter} from "../../utils/utils";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
                .then((films) => {
                    localStorage.setItem('movies', JSON.stringify(films));
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

    return (
        <div className="movies">
            <Header />
            <SearchForm handleSearch={handleSearch} />
            {loading
                ? <Preloader />
                : <MoviesCardList movies={movies} errorMessage={errorMessage} />}
            <Footer />
        </div>
    );
}
