import { MOVIES_URL } from './constants';

export default function getMovies() {
    return fetch(MOVIES_URL, { method: 'GET' })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)));
}
