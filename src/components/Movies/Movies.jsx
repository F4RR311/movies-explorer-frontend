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

export default function Movies({setIsLoader, setIsInfoTooltip, savedMoviesList, onLikeClick, onDeleteClick}) {
    const currentUser = useContext(CurrentUserContext);

    const [shortMovies, setShortMovies] = useState(false); // состояние чекбокса
    const [initialMovies, setInitialMovies] = useState([]); // фильмы полученные с запроса
    const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу и запросу фильмы
    const [NotFound, setNotFound] = useState(false); // если по запросу ничего не найдено - скроем фильмы
    const [isAllMovies, setIsAllMovies] = useState([]); // все фильмы от сервера, для единоразового обращения к нему

    // поиск по массиву и установка состояния
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const filter = (query, shorts) => {
        const storedMovies = JSON.parse(localStorage.getItem('movies'));
        const filtered = searchFilter(storedMovies, query, shorts);

        if (filtered.length === 0) {
            setErrorMessage('Ничего не найдено');
        }

        setMovies(filtered);
        setLoading(false);
    };

    const handleSearch = (query, shorts) => {
        setLoading(true);
        setErrorMessage('');

        const storedMovies = JSON.parse(localStorage.getItem('movies'));

        if (!storedMovies) {
            moviesApi.getMovies()
                .then((films) => {
                    localStorage.setItem('movies', JSON.stringify(films));
                    filter(query, shorts);
                })
                .catch(() =>
                    setIsInfoTooltip({
                        isOpen: true,
                        successful: false,
                        text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.' +
                            ' Подождите немного и попробуйте ещё раз.',
                    })
                )

        } else {
            filter(query, shorts);
        }
    };

    useEffect(() => {
        const savedMovies = localStorage.getItem('savedMovies');

        if (!savedMovies) {
            setLoading(true);

            moviesApi.getMovies()
                .then((films) => {
                    if (films.length > 0) {
                        localStorage.setItem('savedMovies', JSON.stringify(films));
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
                <MoviesCardList
                    movies={movies} errorMessage={errorMessage}
                />
            )}
        </main>
    );
}
