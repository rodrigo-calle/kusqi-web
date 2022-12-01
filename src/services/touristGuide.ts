import { TouristGuideType } from '../types';

const URL_BASE = 'http://localhost:8080';

const createTouristGuide = (touristGuide: TouristGuideType) => {
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(touristGuide)
    }

    return fetch(`${URL_BASE}/api/touristGuides`, payload)
}


const getUserTouristGuides = (id: string) => {
    const payload = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${URL_BASE}/api/touristGuides/user/${id}`, payload);
  };


const deleteTouristGuide = (id: string) => {
    const payload = {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
    };
    return fetch(`${URL_BASE}/api/touristGuides/touristGuide/${id}`, payload);
};
const touristGuide = {
    createTouristGuide,
    getUserTouristGuides,
    deleteTouristGuide
}

export default touristGuide;