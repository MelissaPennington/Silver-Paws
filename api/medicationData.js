/* eslint-disable camelcase */
import { clientCredentials } from '../utils/client';
// import { getPets } from './petData';

const endpoint = clientCredentials.databaseURL;

const getMedications = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medication.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteSingleMedication = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medication/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleMedication = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medication/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createMedication = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medication.json`, {
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

const updateMedication = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medication/${payload.firebaseKey}.json`, {
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

// const getMedicationbyPet = async (userFirebaseKey) => new Promise((resolve, reject) => {
//   let petMedication = '';
//   getPets()
//     .then((pets) => {
//       pets.forEach((pet) => {
//         if (pet.medications.includes(userFirebaseKey)) {
//           petMedication = pet.firebaseKey;
//         }
//       });
//       resolve(petMedication);
//     })
//     .catch((error) => {
//       reject(error);
//     });
// });

const getMedicationbyPet = (pet_id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medication.json?orderBy="pet_id"&equalTo="${pet_id}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getMedicationByPetId = (medicationFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/medication.json?orderBy="firebaseKey"&equalTo="${medicationFirebaseKey}"`, {
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
  getMedications,
  createMedication,
  deleteSingleMedication,
  getSingleMedication,
  updateMedication,
  getMedicationbyPet,
  getMedicationByPetId,
};
