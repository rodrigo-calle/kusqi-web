import { ClientType } from '../types';

const URL_BASE = process.env.REACT_APP_API_URL_BASE;

const createClient = (client: ClientType) => {
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    };

    return fetch(`${URL_BASE}/api/clients`, payload)
}

const getClientById = (id: string) => {
    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return fetch(`${URL_BASE}/api/clients/client/${id}`, payload)
}

const getClientByDni = (dni: string) => {
    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    return fetch(`${URL_BASE}/api/clients/client/document/${dni}`, payload)
}

const getClients = () => {
    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return fetch(`${URL_BASE}/api/clients`, payload)
}

const getUserClients = (userId: string) => {
    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    return fetch(`${URL_BASE}/api/clients/user/${userId}`, payload)
}

const updateClient = (id: string, data: ClientType) => {
    const payload = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    return fetch(`${URL_BASE}/api/clients/client/edit/${id}`, payload)
}


const deleteClient = (id: string) => {
    const payload = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return fetch(`${URL_BASE}/api/clients/client/${id}`, payload);
};

const client = {
    createClient,
    getClients,
    updateClient,
    deleteClient,
    getUserClients,
    getClientById,
    getClientByDni
}

export default client;