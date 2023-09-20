import { getSinglePet, deleteSinglePet } from './petData';
import { deleteSingleMedication, getMedicationbyPet, getSingleMedication } from './medicationData';

const viewPetDetails = (petFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePet(petFirebaseKey)
    .then((petObject) => {
      getSingleMedication(petObject.medication_id)
        .then((medicationObject) => {
          resolve({ medicationObject, ...petObject });
        });
    }).catch((error) => reject(error));
});

const getMedicationByPetId = (petFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePet(petFirebaseKey)
    .then((petObject) => {
      if (!petObject.medication_id) {
        // Handle the case where the pet has no associated medication
        resolve({ ...petObject, medicationObject: null });
      } else {
        getSingleMedication(petObject.medication_id)
          .then((medicationObject) => {
            resolve({ medicationObject, ...petObject });
          })
          .catch((error) => reject(error));
      }
    })
    .catch((error) => reject(error));
});

const viewMedicationDetails = (medicationFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleMedication(medicationFirebaseKey), getMedicationbyPet(medicationFirebaseKey)])
    .then(([medicationObject, petMedicationArray]) => {
      console.log('Medication API Response:', medicationObject);
      console.log('Pet Medication API Response:', petMedicationArray);
      resolve({ ...medicationObject, pet: petMedicationArray });
    }).catch((error) => reject(error));
});

const deletePetMedication = (medicationId) => new Promise((resolve, reject) => {
  getMedicationbyPet(medicationId).then((medicationArray) => {
    console.warn(medicationArray, 'Pet Medication');
    const deleteMedicationPromises = medicationArray.map((medication) => deleteSingleMedication(medication.firebaseKey));

    Promise.all(deleteMedicationPromises).then(() => {
      deleteSinglePet(medicationId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewPetDetails, viewMedicationDetails, getMedicationByPetId, deletePetMedication,
};
