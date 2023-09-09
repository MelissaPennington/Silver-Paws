// import React, { useEffect, useState, useCallback } from 'react';
// import Link from 'next/link';
// import { Button } from 'react-bootstrap';
// import { useAuth } from '../utils/context/authContext';
// import MedicationCard from '../components/medicationCard';
// import { getMedications } from '../api/medicationData';

// function Medications() {
//   const [medications, setMedications] = useState([]);
//   const { user } = useAuth();

//   const getAllTheMedications = useCallback(() => {
//     getMedications(user.uid).then(setMedications);
//   }, [user.uid]);

//   useEffect(() => {
//     getAllTheMedications();
//   }, [getAllTheMedications]);
//   // this is a comment
//   return (
//     <div className="text-center my-4">
//       <Link passHref href="/medication/new">
//         <Button>Add A Medication</Button>
//       </Link>
//       <div className="d-flex flex-wrap">
//         {medications.map((medication) => (
//           <MedicationCard
//             key={medication.firebaseKey}
//             medicationObj={medication}
//             onUpdate={getAllTheMedications}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Medications;
