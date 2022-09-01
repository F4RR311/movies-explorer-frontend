import './SearchForm.css';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Checkbox from '../Checkbox/Checkbox.jsx';
import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';

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
        <section className="search">
            <form className="search__form" name="search" noValidate onSubmit={handleSubmit}>
                <input
                    className="search__input"
                    name="search"
                    type="text"
                    placeholder="Фильм"
                    autoComplete="off"
                    value={inputValue}
                    placeholder={placeholderContent}
                    onChange={handleInput}
                    required
                />
                {/*<span className="search__error">{errorQuery}</span>*/}
                <button className="search__button" type="submit"></button>
            </form>
            <Checkbox value={shorts}
                      onChange={handleCheckbox} />
        </section>
    )
}
