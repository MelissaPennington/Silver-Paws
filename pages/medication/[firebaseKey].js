import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewMedicationDetails } from '../../api/mergedData';
import PetCard from '../../components/petCard';

export default function ViewMedication() {
  const [medicationDetails, setMedicationDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewMedicationDetails(firebaseKey).then(setMedicationDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h3>{medicationDetails?.type}</h3>
        <h4>{medicationDetails?.quantity}</h4>
        <p>{medicationDetails?.instructions}</p>
        <h5>Pets by {medicationDetails?.name}:</h5>
        {Array.isArray(medicationDetails.pets) && medicationDetails.pets.length > 0 ? (
          medicationDetails.pets.map((pet) => (
            <PetCard key={pet.firebaseKey} petObj={pet} />
          ))
        ) : (
          <p>No pets found for this medication.</p>
        )}
      </div>
    </div>
  );
}
// {/* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { viewMedicationDetails } from '../../api/mergedData';
// import PetCard from '../../components/petCard';

// export default function ViewMedication() {
//   const [medicationDetails, setMedicationDetails] = useState({});
//   const router = useRouter();

//   // TODO: grab firebaseKey from url
//   const { firebaseKey } = router.query;

//   // TODO: make call to API layer to get the data
//   useEffect(() => {
//     viewMedicationDetails(firebaseKey).then(setMedicationDetails);
//   }, [firebaseKey]);

//     return (
//       <div className="mt-5 d-flex flex-wrap">
//         <div className="d-flex flex-column">
//         <h1>Medication Details</h1>
//         <h2>{medicationDetails.name}</h2>
//         <h3>{medicationDetails.type}</h3>
//         <h4>{medicationDetails.quantity}</h4>
//         <p>{medicationDetails.instructions}</p>
//         <h5>Pets by {medicationDetails.name}:</h5>
//           {Array.isArray(pets) && pets.length > 0 ? (
//             pets.map((pet) => (
//               <PetCard key={pet.firebaseKey} petObj={pet} />
//             ))
//           ) : (
//             <p>No pets found for this medication.</p>
//           )}
//         </div>
//       </div>
