import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'applications/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleUser = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleUser = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getUserPets = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pet.json?orderBy="user_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getUser,
  createUser,
  getSingleUser,
  deleteSingleUser,
  updateUser,
  getUserPets,
};
