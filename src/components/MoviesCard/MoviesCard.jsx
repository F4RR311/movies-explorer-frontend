import React, {useState, useContext, useEffect} from 'react';
import './MoviesCard.css';
import {useLocation} from 'react-router-dom';
import {transformDuration} from '../../utils/utils.js';
import TooltipContext from "../../contexts/TooltipContext";
import mainApi from "../../utils/MainApi";
import {DEFAULT_MESSAGE, MINUTS_IN_HOUR, NO_CONNECTION_MESSAGE} from "../../utils/constants";

export default function MoviesCard({movie}) {
    const [savedId, setSavedId] = useState('');
    const [saved, setSaved] = useState(false);
    const location = useLocation();

    const {setTooltipMessage} = useContext(TooltipContext);

    const handleSetSaved = (evt) => {
        if (!saved) {
            const newMovie = {};
            const {image, id} = movie;

            Object.assign(newMovie, movie);

            delete newMovie.id;
            delete newMovie.created_at;
            delete newMovie.updated_at;

            //  Фильтр для заполнения отсутствующих значений в ответе от сервера фильмов
            Object.entries(newMovie).forEach((key) => {
                if (!key[1]) {
                    newMovie[key[0]] = '...';
                }
            });

            mainApi.addNewMovie({
                ...newMovie,
                image: `https://api.nomoreparties.co/${image.url}`,
                thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
                movieId: id,
            })
                .then((savedMovie) => {
                    setSaved(true);
                    setSavedId(savedMovie._id);

                    let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

                    if (!savedMovies) {
                        savedMovies = [];
                    }

                    savedMovies.push(savedMovie);
                    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
                })
                .catch((err) => {
                    if (err.status === 400) {
                        setTooltipMessage(DEFAULT_MESSAGE);
                    } else {
                        setTooltipMessage(NO_CONNECTION_MESSAGE);
                    }
                });
        } else {
            mainApi.deleteMovie(savedId)
                .then(() => {
                    setSaved(false);
                    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

                    // Поиск и удаление сохраненного фильма из массива в localStorage
                    let index = 0;
                    for (let i = 0; i < savedMovies.length; i += 1) {
                        const film = savedMovies[i];
                        if (film._id === movie._id) {
                            index = i;
                        }
                    }

                    savedMovies.splice(index, 1);
                    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));

                    if (location.pathname === '/saved-movies') {
                        evt.target.closest('.movies-card').remove();
                    }
                })
                .catch(() => setTooltipMessage('NO_CONNECTION_MESSAGE'));
        }
    };

    useEffect(() => {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

        if (savedMovies) {
            savedMovies.forEach((savedMovie) => {
                if (savedMovie.movieId === movie.id || savedMovie._id === movie._id) {
                    setSaved(true);
                    setSavedId(savedMovie._id);
                }
            });
        }
    }, []);
    return (
        <li className="movies-card">
            <div className="movies-card__info">
                <h3 className="movies-card__heading movies-card__text">{movie.nameRU}</h3>
                <p className="movies-card__duration movies-card__text">
                    {`${Math.floor(movie.duration / MINUTS_IN_HOUR)}ч${movie.duration % MINUTS_IN_HOUR}м`}
                </p>
            </div>
            <a href={movie.trailerLink} target="_blank" rel="noreferrer">
                <img
                    className="movies-card__image"
                    src={location.pathname === '/movies'
                        ? `https://api.nomoreparties.co/${movie.image.url}`
                        : movie.image}
                    alt={movie.image.name}
                />
            </a>
            {location.pathname !== '/saved-movies' ? (
                <button
                    className={`movies-card__button movies-card__save-button ${saved && 'movies-card__save-button_active'}`}
                    type="button"
                    aria-label="Сохранить"
                    onClick={handleSetSaved}
                >Сохранить
                </button>
            ) : (
                <button
                    className="movies-card__button movies-card__delete-button"
                    type="button"
                    aria-label="Удалить"
                    onClick={handleSetSaved}
                />
            )}
        </li>
    );
}
