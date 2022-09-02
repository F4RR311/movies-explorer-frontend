import { BASE_URL } from './constants';

class MainApi {
    constructor(url) {
        this.url = url;
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

    getUser() {
        return this._fetch('/users/me');
    }

    patchUser(user) {
        return this._fetch('/users/me', user, 'PATCH');
    }

    getFilms() {
        return this._fetch('/movies');
    }

    saveFilm(film) {
        return this._fetch('/movies', film, 'POST');
    }

    deleteFilm(id) {
        return this._fetch(`/movies/${id}`, {}, 'DELETE');
    }

    register(user) {
        return this._fetch('/signup', user, 'POST');
    }

    login(user) {
        return this._fetch('/signin', user, 'POST');
    }

    logout() {
        return this._fetch('/signout', {}, 'POST');
    }
}

const mainApi = new MainApi(BASE_URL);

export default mainApi;
