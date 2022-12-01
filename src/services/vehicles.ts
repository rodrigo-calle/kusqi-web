import { VehiclesType } from '../types';

const URL_BASE = 'http://localhost:8080';

const createVehicle = (vehicles: VehiclesType) => {
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehicles)
    }

    return fetch(`${URL_BASE}/api/vehicles`, payload)
}


const getUserVehicles= (id: string) => {
    const payload = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${URL_BASE}/api/vehicles/user/${id}`, payload);
  };


const deleteVehicles = (id: string) => {
    const payload = {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
    };
    return fetch(`${URL_BASE}/api/vehicles/vehicle/${id}`, payload);
};
const touristGuide = {
    createVehicle,
    getUserVehicles,
    deleteVehicles
}

export default touristGuide;