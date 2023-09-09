import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMedication } from '../../../api/medicationData';
import MedicationForm from '../../../components/Form/medicationForm';

export default function EditMedication() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleMedication(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<MedicationForm obj={editItem} />);
}

// /* eslint-disable camelcase */
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import PetCard from '../../../components/petCard';
// import { viewMedicationDetails } from '../../../api/mergedData';

// export default function MedicationDetails() {
//   const [medicationData, setMedicationData] = useState(null);
//   const router = useRouter();

//   const { firebaseKey } = router.query;

//   useEffect(() => {
//     if (firebaseKey) {
//       viewMedicationDetails(firebaseKey)
//         .then((data) => setMedicationData(data))
//         .catch((error) => {
//           console.error('Error fetching pet details:', error);
//           setMedicationData(null);
//         });
//     }
//   }, [firebaseKey]);

//   if (!medicationData) {
//     return <p>Loading medication details...</p>;
//   }

//   const {
//     name, type, quanity, instructions, pets,
//   } = medicationData;

//   return (
//     <div>
//       <h1>Medication Details</h1>
//       <h2>{name}</h2>
//       <h3>{type}</h3>
//       <h4>{quanity}</h4>
//       <h5>{instructions}</h5>
//       <h6>Pets by {name}:</h6>
//       {Array.isArray(pets) && pets.length > 0 ? (
//         pets.map((pet) => (
//           <PetCard key={pet.firebaseKey} petObj={pet} />
//         ))
//       ) : (
//         <p>No pets found with this medication.</p>
//       )}
//     </div>
//   );
// }
