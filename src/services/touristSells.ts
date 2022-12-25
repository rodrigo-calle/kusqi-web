import { TouristSellType } from '../types';
const URL_BASE = process.env.REACT_APP_API_URL_BASE;

const createTouristSell = (touristSell: TouristSellType) => {
    const payload =  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(touristSell)
    }
    return fetch(`${URL_BASE}/api/touristSells`, payload)
}


const touristSell = {
    createTouristSell,
}

export default touristSell;