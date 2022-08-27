const BASE_URL = 'http://localhost:3001';
const MOVIES_URL = 'http://localhost:3000';
const SHORTMOVIES_DURATION = 40;
const DEVICE_PARAMS = {
    desktop: {
        width: 917,
        cards: {
            total: 12,
            more: 3,
        },
    },
    tablet: {
        width: 583,
        cards: {
            total: 8,
            more: 2,
        },
    },
    mobile: {
        width: 583,
        cards: {
            total: 5,
            more: 2,
        },
    },
};

export { BASE_URL, MOVIES_URL, SHORTMOVIES_DURATION, DEVICE_PARAMS };
