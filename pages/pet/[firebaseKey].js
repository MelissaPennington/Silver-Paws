import React from 'react';
import PetForm from '../../components/Form/petForm';

export default function AddPetForm() {
  return <PetForm />;
}

// /* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { viewPetDetails } from '../../api/mergedData';

// export default function ViewPet() {
//   const [petDetails, setPetDetails] = useState({});
//   const router = useRouter();

//   // TODO: grab firebaseKey from url
//   const { firebaseKey } = router.query;

//   // TODO: make call to API layer to get the data
//   useEffect(() => {
//     viewPetDetails(firebaseKey).then(setPetDetails);
//   }, [firebaseKey]);

//   return (
//     <div className="mt-5 d-flex flex-wrap">
//       <div className="d-flex flex-column">
//         <img src={petDetails.image} alt={petDetails.name} style={{ width: '300px' }} />
//       </div>
//       <div className="text-white ms-5 details">
//         <h5>
//           {petDetails.name} by {petDetails.medicationObject?.name}
//         </h5>
//         Name: <a href={`mailto:${petDetails.medicationObject?.name}`}>{petDetails.medicationObject?.name}</a>
//         <p>{petDetails.description || ''}</p>
//         <hr />
//         {/* <p>
//           {petDetails.sale
//             ? `🏷️ Sale $${petDetails.price}`
//             : `$${petDetails.price}`}
//         </p> */}
//       </div>
//     </div>
//   );
// }
