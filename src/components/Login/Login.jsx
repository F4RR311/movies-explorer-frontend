import React, { useContext, useEffect, useState }  from 'react';
import { Link, useNavigate} from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import Logo from '../Logo/Logo';
import TextInput from '../TextInput/TextInput';
import mainApi from '../../utils/MainApi';
import UserContext from '../../contexts/UserContext';
import { UNAUTH_ERROR_CODE } from '../../utils/constants';
import './Login.css';

export default function Login() {
    const form = useFormWithValidation();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [disabled, setDisabled] = useState(true);

    const { setCurrentUser } = useContext(UserContext);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        setDisabled(true);

        mainApi.login(form.values)
            .then(() => mainApi.getUser())
            .then((user) => {
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('userId', user._id);

                setCurrentUser(user);
                navigate('/movies');
            })
            .catch((err) => {
                if (err.status === UNAUTH_ERROR_CODE) {
                    setLoginError('Неправильные почта или пароль');
                } else {
                    setLoginError('Нет соединения с сервером');
                }
            });
    };

    useEffect(() => {
        setDisabled(!form.isValid);
    }, [form.values]);

    return (
        <div className="login">
            <div className="login__top">
                <Logo />
                <h2 className="login__heading login__text">Рады видеть!</h2>
            </div>
            <form
                className="login__form"
                id="login"
                name="login"
                onSubmit={handleSubmit}
                noValidate
            >
                <TextInput
                    name="email"
                    label="E-mail"
                    type="email"
                    pattern="^[\w]+@[a-zA-Z]+\.[a-zA-Z]{1,3}$"
                    value={form.values.email || ''}
                    onChange={form.handleChange}
                    errorMessage={form.errors.email}
                />
                <TextInput
                    name="password"
                    label="Пароль"
                    type="password"
                    value={form.values.password || ''}
                    onChange={form.handleChange}
                    errorMessage={form.errors.password}
                />
            </form>
            <div className="login__bottom">
                <p className="login__text login__text_color_red">{loginError}</p>
                <button
                    className={`login__submit-button ${disabled && 'login__submit-button_disabled'} login__text`}
                    type="submit"
                    form="login"
                    disabled={disabled}
                >
                    Войти
                </button>
                <div className="login__question">
                    <p className="login__text login__text_color_grey">Ещё не зарегистрированы?</p>
                    <Link to="/signup" className="login__link login__text">Регистрация</Link>
                </div>
            </div>
        </div>
    );
}
