/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PetCard from '../../components/petCard';
import { viewMedicationDetails } from '../../api/mergedData';

export default function MedicationDetails() {
  const [medicationData, setMedicationData] = useState(null);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      viewMedicationDetails(firebaseKey)
        .then((data) => setMedicationData(data))
        .catch((error) => {
          console.error('Error fetching medication details:', error);
          setMedicationData(null);
        });
    }
  }, [firebaseKey]);

  if (!medicationData) {
    return <p>Loading medication details...</p>;
  }

  const {
    name, type, quanity, instructions, pets,
  } = medicationData;

  return (
    <div>
      <h1>Medication Details</h1>
      <h2>{name}</h2>
      <h3>{type}</h3>
      <h4>{quanity}</h4>
      <p>{instructions}</p>
      <h5>Pets by {name}:</h5>
      {Array.isArray(pets) && pets.length > 0 ? (
        pets.map((pet) => (
          <PetCard key={pet.firebaseKey} petObj={pet} />
        ))
      ) : (
        <p>No pets found for this medication.</p>
      )}
    </div>
  );
}
