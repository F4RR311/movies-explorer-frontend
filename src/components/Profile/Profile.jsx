import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import UserContext from '../../contexts/UserContext';
import TooltipContext from '../../contexts/TooltipContext';
import {
  CONFLICT_ERROR_CODE,
  EMAIL_EXIST_MESSAGE,
  NO_CONNECTION_MESSAGE,
  SUCCESS__UPDATE_MESSAGE,
} from '../../utils/constants';

export default function Profile() {
  const form = useFormWithValidation();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const { setTooltipMessage } = useContext(TooltipContext);

  const handleSignuot = () => {
    mainApi.logout()
        .then(() => {
          setCurrentUser({});
          localStorage.clear();
          navigate('/');
        })
        .catch(() => setTooltipMessage(NO_CONNECTION_MESSAGE));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setDisabled(true);

    mainApi.patchUser(form.values)
        .then((user) => {
          setCurrentUser(user);
          setMessage(SUCCESS__UPDATE_MESSAGE);
          form.resetForm();
        })
        .catch((err) => {
          if (err.status === CONFLICT_ERROR_CODE) {
            setMessage(EMAIL_EXIST_MESSAGE);
          } else {
            setMessage(NO_CONNECTION_MESSAGE);
          }
        });
  };

  useEffect(() => {
    form.setValues({ name: currentUser.name, email: currentUser.email });
  }, [currentUser]);

  useEffect(() => {
    const { name, email } = form.values;

    if (form.isValid && (currentUser.name !== name || currentUser.email !== email)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [form.values, currentUser]);

  return (
      <div className="profile">
        <Header />
        <div className="profile__content">
          <h2 className="profile__heading profile__text profile__text_marked">
            {`Привет, ${currentUser.name}!`}
          </h2>
          <form
              className="profile__info"
              id="profile"
              name="profile"
              onSubmit={handleSubmit}
          >
            <div className="profile__info-item">
              <p className="profile__text profile__text_marked">Имя</p>
              <input
                  className="profile__text profile__input"
                  type="text"
                  name="name"
                  value={form.values.name || ''}
                  onChange={form.handleChange}
                  pattern="^[a-zA-Zа-яА-Я\s-]+$"
                  required
              />
            </div>
            <div className="profile__info-item">
              <p className="profile__text profile__text_marked">E-mail</p>
              <input
                  className="profile__text profile__input"
                  type="email"
                  name="email"
                  value={form.values.email || ''}
                  onChange={form.handleChange}
                  pattern="^[\w]+@[a-zA-Z]+\.[a-zA-Z]{1,3}$"
                  required
              />
            </div>
          </form>
          <ul className="profile__buttons">
            <p className="profile__text profile__message">{message}</p>
            <li className="profile__button-item">
              <button
                  className={`profile__button ${disabled && 'profile__button_disabled'} profile__text`}
                  type="submit"
                  form="profile"
                  disabled={disabled}
              >
                Редактировать
              </button>
            </li>
            <li className="profile__button-item">
              <button
                  className="profile__button profile__text profile__text_color_red"
                  type="button"
                  onClick={handleSignuot}
              >
                Выйти из аккаунта
              </button>
            </li>
          </ul>
        </div>
      </div>
  );
}
