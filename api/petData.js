import { clientCredentials } from '../utils/client';
// import { getUser } from './userData';

const endpoint = clientCredentials.databaseURL;

const getPets = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pet.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteSinglePet = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pet/${firebaseKey}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch pet data: ${response.statusText}`);
      }
      return response.json();
    })
    .then((petData) => {
      const updatedPetData = { ...petData, isDeleted: true };

      fetch(`${endpoint}/pet/${firebaseKey}.json`, {
        method: 'PATCH', // Update to 'PATCH' to modify the existing record
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPetData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to update pet data: ${response.statusText}`);
          }
          return response.json();
        })
        .then((updatedData) => {
          // Now, the isDeleted field should be true in Firebase
          resolve(updatedData);
        })
        .catch(reject);
    })
    .catch(reject);
});

// const getDeletedPets = (uid) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/pet.json?orderBy="uid"&equalTo="${uid}"&orderBy="isDeleted"&equalTo=true`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(Object.values(data)))
//     .catch(reject);
// });

const getDeletedPets = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pet.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const isDeleted = Object.values(data).filter((pet) => pet.isDeleted);
      resolve(isDeleted);
    })
    .catch(reject);
});

const getSinglePet = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pet/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createPet = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pet.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updatePet = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pet/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getPets,
  createPet,
  deleteSinglePet,
  getDeletedPets,
  getSinglePet,
  updatePet,
};
