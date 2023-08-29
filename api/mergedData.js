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

const viewMedicationDetails = (medicationFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleMedication(medicationFirebaseKey), getMedicationbyPet(medicationFirebaseKey)])
    .then(([medicationObject, petMedicationArray]) => {
      resolve({ ...medicationObject, pets: petMedicationArray });
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

export { viewPetDetails, viewMedicationDetails, deletePetMedication };
