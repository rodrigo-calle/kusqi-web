import { TourType } from '../types';

const URL_BASE = 'http://localhost:8080';


const createTour = (tour: TourType) => {
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tour)
    }

    return fetch(`${URL_BASE}/api/tours`, payload)
}

const getUserTour= (id: string) => {
    const payload = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${URL_BASE}/api/tours/user/${id}`, payload);
};

const touristServices = {
    getUserTour,
    createTour
}

export default touristServices;
