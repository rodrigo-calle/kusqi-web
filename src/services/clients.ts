import { ClientType } from '../types';

const URL_BASE = 'http://localhost:8080';

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

const getClients = () => {
    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return fetch(`${URL_BASE}/api/clients`, payload)
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
    deleteClient
}

export default client;