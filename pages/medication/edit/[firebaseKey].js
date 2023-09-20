// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import PetCard from '../../../components/petCard';
// import { getMedicationByPetId, viewMedicationDetails } from '../../../api/mergedData';

// // Add a function to filter pets with a specific medication
// const getPetsWithMedication = async (medicationFirebaseKey) => {
//   try {
//     const pets = await fetch(`${endpoint}/pets.json`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }).then((response) => response.json());

//     // Filter pets that have the specified medicationFirebaseKey
//     const petsWithMedication = pets.filter((pet) => pet.medications.includes(medicationFirebaseKey));

//     return petsWithMedication;
//   } catch (error) {
//     console.error('Error fetching pets:', error);
//     return [];
//   }
// };

// export default function MedicationDetails() {
//   const [medicationData, setMedicationData] = useState(null);
//   const [medications, setMedications] = useState([]);
//   const [petsWithMedication, setPetsWithMedication] = useState([]);
//   const router = useRouter();

//   const { firebaseKey } = router.query;

//   useEffect(() => {
//     if (firebaseKey) {
//       // Fetch medication details
//       viewMedicationDetails(firebaseKey)
//         .then((data) => {
//           setMedicationData(data);

//           if (Array.isArray(data.pet) && data.pet.length > 0) {
//             const petIds = data.pet.map((pet) => pet.firebaseKey);

//             // Fetch medications assigned to pets
//             getMedicationByPetId(petIds)
//               .then((medications) => {
//                 setMedications(medications);
//               })
//               .catch((error) => {
//                 console.error('Error fetching medications:', error);
//                 setMedications([]); // Set medications to an empty array in case of an error
//               });

//             // Fetch pets with the specified medication
//             getPetsWithMedication(firebaseKey)
//               .then((petsWithMedication) => {
//                 setPetsWithMedication(petsWithMedication);
//               })
//               .catch((error) => {
//                 console.error('Error fetching pets with medication:', error);
//                 setPetsWithMedication([]); // Set petsWithMedication to an empty array in case of an error
//               });
//           } else {
//             setMedications([]); // No pets found, set medications to an empty array
//             setPetsWithMedication([]); // No medication found, set petsWithMedication to an empty array
//           }
//         })
//         .catch((error) => {
//           console.error('Error fetching medication details:', error);
//           setMedicationData(null);
//           setMedications([]);
//           setPetsWithMedication([]);
//         });
//     }
//   }, [firebaseKey]);

//   if (!medicationData) {
//     return <p>Loading medication details...</p>;
//   }

//   const {
//     name, type, quantity, instructions,
//   } = medicationData;

//   return (
//     <div>
//       <h1>Medication Details</h1>
//       <h2>{name}</h2>
//       <h3>{type}</h3>
//       <h4>{quantity}</h4>
//       <h5>{instructions}</h5>

//       <h6>Pets by {name}:</h6>
//       {Array.isArray(petsWithMedication) && petsWithMedication.length > 0 ? (
//         petsWithMedication.map((pet) => (
//           <PetCard key={pet.firebaseKey} petObj={pet} />
//         ))
//       ) : (
//         <p>No pets found with this medication.</p>
//       )}

//       <h6>Medications assigned to {name}:</h6>
//       {medications.length > 0 ? (
//         medications.map((medication) => (
//           <div key={medication.firebaseKey}>
//             <p>{medication.name}</p>
//             {/* Add other medication details you want to display */}
//           </div>
//         ))
//       ) : (
//         <p>No medications assigned to {name}.</p>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PetCard from '../../../components/petCard';
import { getMedicationByPetId, viewMedicationDetails } from '../../../api/mergedData';

export default function MedicationDetails() {
  const [medicationData, setMedicationData] = useState(null);
  const [medications, setMedications] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      // Fetch medication details
      viewMedicationDetails(firebaseKey)
        .then((data) => {
          setMedicationData(data);
          // Assuming you have an API function to fetch medications by pet ID
          if (Array.isArray(data.pet) && data.pet.length > 0) {
            const petIds = data.pet.map((pet) => pet.firebaseKey);
            getMedicationByPetId(petIds)
              // eslint-disable-next-line no-shadow
              .then((medications) => {
                setMedications(medications);
              })
              .catch((error) => {
                console.error('Error fetching medications:', error);
                setMedications([]); // Set medications to an empty array in case of an error
              });
          } else {
            setMedications([]); // No pets found, set medications to an empty array
          }
        })
        .catch((error) => {
          console.error('Error fetching pet details:', error);
          setMedicationData(null);
          setMedications([]);
        });
    }
  }, [firebaseKey]);

  if (!medicationData) {
    return <p>Loading medication details...</p>;
  }

  const {
    name, type, quantity, instructions, pets,
  } = medicationData;

  return (
    <div>
      <h1>Medication Details</h1>
      <h2>{name}</h2>
      <h3>{type}</h3>
      <h4>{quantity}</h4>
      <h5>{instructions}</h5>
      <h6>Pets by {name}:</h6>
      {Array.isArray(pets) && pets.length > 0 ? (
        pets.map((pet) => (
          <PetCard key={pet.firebaseKey} petObj={pet} />
        ))
      ) : (
        <p>No pets found with this medication.</p>
      )}

      <h6>Medications assigned to {name}:</h6>
      {medications.length > 0 ? (
        medications.map((medication) => (
          <div key={medication.firebaseKey}>
            <p>{medication.name}</p>
            {/* Add other medication details you want to display */}
          </div>
        ))
      ) : (
        <p>No medications assigned to {name}.</p>
      )}
    </div>
  );
}
