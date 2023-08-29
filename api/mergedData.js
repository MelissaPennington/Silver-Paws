// import { getUserPets, getSingleUser } from './userData';
// import { getSinglePet, deleteSinglePet } from './petData';
// // import { getSingleMedication, deleteSingleMedication } from './medicationData';

// const viewUserDetails = (userFirebaseKey) => new Promise((resolve, reject) => {
//   getSingleUser(userFirebaseKey)
//     .then((userObject) => {
//       getSingleUser(userobject.pet_id)
//         .then((userObject) => {
//           resolve({ userObject, ...petObject });
//         });
//     }).catch((error) => reject(error));
// });

// const viewPetDetails = (petFirebaseKey) => new Promise((resolve, reject) => {
//   Promise.all([getSinglePet(petFirebaseKey), getUserPets(petFirebaseKey)])
//     .then(([petObject, userPetsArray]) => {
//       resolve({ ...petObject, user: userPetsArray });
//     }).catch((error) => reject(error));
// });

// const deleteUserPet = (userId) => new Promise((resolve, reject) => {
//   getUserPets(userId).then((petArray) => {
//     console.warn(petArray, 'User Pet');
//     const deletePetPromises = petArray.map((pet) => deleteSinglePet(pet.firebaseKey));

//     Promise.all(deletePetPromises).then(() => {
//       deleteSinglePet(userId).then(resolve);
//     });
//   }).catch((error) => reject(error));
// });

// export { viewUserDetails, viewPetDetails, deleteUserPet };
