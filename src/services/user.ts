import { BusinessCategories, RegisterType } from '../types';

// const URL_BASE = process.env.REACT_APP_API_URL_BASE;
const URL_BASE = 'http://localhost:8080'


const createUser = (data: RegisterType) => {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return fetch(`${URL_BASE}/api/users/`, payload);
};

const getUserProfile = (id: string) => {
  // const token = localStorage.getItem('token');
  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      //  Authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${URL_BASE}/api/users/${id}`, payload);
};

const getAllUsers = () => {
  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(`${URL_BASE}/api/users/`, payload);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateUser = (data: any) => {
  const payload = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(`${URL_BASE}/api/users/edit`, payload);
};

const getUserByCategory = (category: BusinessCategories) => {
  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(data),
  };
  return fetch(`${URL_BASE}/api/users/category/${category}`, payload);
};

const confirmAccount = (hash: string) => {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(`${URL_BASE}/auth/local/confirm-account/${hash}`, payload);
};

const user = {
  createUser,
  getUserProfile,
  getAllUsers,
  updateUser,
  confirmAccount,
  getUserByCategory,
};

export default user;
