import './Movies.css';
import {useState, useContext, useEffect} from 'react';
import {
    transformMovies, // для адаптирования полей под свой бэкенд
    filterMovies, // фильтрация начального массива всех фильмов по запросу
    filterShortMovies, // фильтрация по длительности
} from '../../utils/utils.js';
import moviesApi from '../../utils/MoviesApi.js';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';
import {searchFilter} from "../../utils/utils";
import getMovies from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import Header from "../Header/Header";
import {MOVVIES_MESSAGE, NOT_FOUND_MESSAGE} from "../../utils/constants";

export default function Movies({setIsInfoTooltip}) {


    // поиск по массиву и установка состояния
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
            getMovies()
                .then((films) => {
                    localStorage.setItem('movies', JSON.stringify(films));
                    filter(query, shorts);
                })
                .catch(() =>
                    setErrorMessage(MOVVIES_MESSAGE)
                )

        } else {
            filter(query, shorts);
        }
    };

    useEffect(() => {
        const savedMovies = localStorage.getItem('savedMovies');

        if (!savedMovies) {
            setLoading(true);

            mainApi.getSavedMovies()
                .then((movies) => {
                    if (movies.length > 0) {
                        localStorage.setItem('savedMovies', JSON.stringify(movies));
                    }
                    setLoading(false);
                })
                .catch(() =>
                    setIsInfoTooltip({
                        isOpen: true,
                        successful: false,
                        text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.' +
                            ' Подождите немного и попробуйте ещё раз.',
                    })
                )

        }
    }, []);

    return (
        <main className="movies">
            <SearchForm
                handleSearch={handleSearch}
            />
            {loading && (
                <MoviesCardList movies={movies} errorMessage={errorMessage}/>
            )}
        </main>
    );
}
