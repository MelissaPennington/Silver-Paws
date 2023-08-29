import { clientCredentials } from '../utils/client';
// import { getUser } from './userData';

const endpoint = clientCredentials.databaseURL;

const getPets = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/member.json?orderBy="uid"&equalTo="${uid}"`, {
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
  fetch(`${endpoint}/pet/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
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

// const getPetbyUser = async (userFirebaseKey) => new Promise((resolve, reject) => {
//   let petUser = ''; getUser()
//     .then((users) => {
//       users.forEach((user) => {
//         if ([user.pets].includes(userFirebaseKey)) {
//           petUser = user.firebaseKey;
//         }
//       });
//       resolve(petUser);
//     })
//     .catch((error) => {
//       reject(error);
//     });
// });

// const getMemberByTeam = async (playerFirebaseKey) => {
//   let memberTeam = '';
//   await getTeams()
//     .then((teams) => {
//       teams.forEach((team) => {
//         if ([team.roster].includes(playerFirebaseKey)) {
//           memberTeam = team.firebaseKey;
//         }
//       });
//     });
//   return memberTeam;
// };

export {
  getPets,
  createPet,
  deleteSinglePet,
  getSinglePet,
  updatePet,
  // getPetbyUser,
};
