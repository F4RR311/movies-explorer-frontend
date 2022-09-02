import { BASE_URL } from './constants.js';


class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    // проверка статуса запроса
    async _requestResult(res) {
        const result = await res.json();
        return res.ok ? result : Promise.reject(result.message);
    }

    // регистрация
    createUser(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        }).then(res => this._requestResult(res));
    }

    // вход
    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }).then(res => this._requestResult(res));
    }

    // запрос данных пользователя
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => this._requestResult(res));
    }

    // запрос на редактирование данных пользователя
    updateUser(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        }).then(res => this._requestResult(res));
    }

    // запрос фильмов
    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => this._requestResult(res));
    }

    _fetch(path, body, method = 'GET') {
        return fetch(this.url + path, {
            method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res)));
    }

    // сохранение фильма
    addNewMovie(film) {
        return this._fetch('/movies', film, 'POST');
    }

    // удаление фильма из сохранённых
    deleteMovie(id) {
        return this._fetch(`/movies/${id}`, {}, 'DELETE');
    }
}

const mainApi = new Api({

    baseUrl: BASE_URL,
});

export default mainApi;
