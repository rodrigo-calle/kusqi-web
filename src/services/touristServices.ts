import { ServiceType } from '../types';

const URL_BASE = 'http://localhost:8080';


const createService = (service: ServiceType) => {
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(service)
    }

    return fetch(`${URL_BASE}/api/touristService`, payload)
}

const getUserServices= (id: string) => {
    const payload = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${URL_BASE}/api/touristService/user/${id}`, payload);
};

const touristServices = {
    createService,
    getUserServices
}

export default touristServices;
