import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useScreenWidth from '../../hooks/useScreenWidth.jsx';
import { DEVICE_PARAMS } from '../../utils/constants.js';
import { getSavedMovieCard } from '../../utils/utils.js';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import {
    MAX_MOVIES_1280,
    MAX_MOVIES_630,
    MAX_MOVIES_990, MAX_MOVIES_DEFAULT,
    MAX_MOVIES_STEP_1280, MAX_MOVIES_STEP_990,
    MAX_MOVIES_STEP_DEFAULT
} from "../../utils/constants";


export default function MoviesCardList({ movies, savedMoviesList, onLikeClick, onDeleteClick }) {
    const [maxMovies, setMaxMovies] = useState(0);
    const [step, setStep] = useState(0);
    const location = useLocation();

    const showMoreMovies = () => {
        setMaxMovies(maxMovies + step);
    };

    const setCardsTemplate = () => {
        const width = window.innerWidth;

        if (location.pathname === '/saved-movies') {
            setMaxMovies(movies.length);
        }

        if (width >= 1280) {
            setMaxMovies(MAX_MOVIES_1280);
            setStep(MAX_MOVIES_STEP_1280);
        } else if (width >= 990) {
            setMaxMovies(MAX_MOVIES_990);
            setStep(MAX_MOVIES_STEP_990);
        } else if (width >= 630) {
            setMaxMovies(MAX_MOVIES_630);
            setStep(MAX_MOVIES_STEP_DEFAULT);
        } else {
            setMaxMovies(MAX_MOVIES_DEFAULT);
            setStep(MAX_MOVIES_STEP_DEFAULT);
        }
    };

    useEffect(() => {
        setCardsTemplate();

        window.addEventListener('resize', () => {
            setTimeout(() => {
                setCardsTemplate();
            }, 500);
        });
    }, []);

    return (
        <section className="movies-card-list">
            <ul className="movies-card-list__list">
                {movies.map((movie, index) => {
                    if (index < maxMovies) {
                        return (
                            <MoviesCard
                                key={movie.id || movie.movieId}
                                movie={movie}
                            />
                        );
                    }
                    return null;
                })}
            </ul>
            {movies.length > maxMovies && location.pathname !== '/saved-movies' && (
                <button
                    className="movies-card-list__show-more"
                    onClick={showMoreMovies}
                >
                    Ещё
                </button>
            )}
        </section>
    );
}
