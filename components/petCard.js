import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteSinglePet } from '../api/petData';
import { getMedicationbyPet } from '../api/medicationData';
import MedicationCard from './medicationCard'; // Import the MedicationCard component

export default function PetCard({ petObj, onUpdate }) {
  const router = useRouter();
  const [medications, setMedications] = useState([]);
  const isDeleted = petObj.isDeleted || false; // Check if 'deleted' property is true or not

  const getMeds = () => {
    getMedicationbyPet(petObj.firebaseKey)
      .then((meds) => {
        console.log('Fetched medications:', meds);
        setMedications(meds || []);
      })
      .catch((error) => {
        console.error('Error fetching medications:', error);
        setMedications([]);
      });
  };

  useEffect(() => {
    console.warn('Fetching medications for pet with Firebase key:', petObj.firebaseKey);

    if (petObj.firebaseKey) {
      getMeds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petObj.firebaseKey]);

  console.warn('PetCard props:', petObj);
  console.warn('Medications:', medications);

  const deleteAndNavigateToRemember = () => {
    if (window.confirm(`🪦 R.I.P. ${petObj.name}?`)) {
      const updatedPetObj = { ...petObj, deleted: true };

      deleteSinglePet(petObj.firebaseKey, updatedPetObj)
        .then(() => {
          onUpdate(petObj.firebaseKey);
          router.push('/deceased');
        })
        .catch((error) => {
          console.error('Error deleting pet:', error);
        });
    }
  };

  return (
    <>
      {!isDeleted && ( // Conditionally render if the pet is not deleted
        <Card style={{ width: '18rem', margin: '8px' }}>
          {petObj.image && (
            <>
              <Card.Img
                variant="top"
                src={petObj.image}
                alt={petObj.name}
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>Name: {petObj.name}</Card.Title>
                <Card.Title>Age: {petObj.age}</Card.Title>
                <Card.Title>Breed: {petObj.breed}</Card.Title>
                <Card.Title>Actions: {petObj.action}</Card.Title>
                {/* Display medications as a comma-separated list */}
                {medications.length > 0 && (
                  <div>
                    <h5>Medications:</h5>
                    <p>{medications.map((medication) => medication.name).join(', ')}</p>
                  </div>
                )}
                <Link href={`/pet/${petObj.firebaseKey}`} passHref>
                  <Button variant="light" className="m-2">
                    VIEW
                  </Button>
                </Link>
                <Link href={`/pet/edit/${petObj.firebaseKey}`} passHref>
                  <Button variant="secondary">EDIT</Button>
                </Link>
                <Button variant="dark" onClick={deleteAndNavigateToRemember} className="m-2">
                  R.I.P.
                </Button>
              </Card.Body>
              {/* Render MedicationCard for each medication */}
              {medications.map((medication) => (
                <MedicationCard
                  key={medication.firebaseKey}
                  medicationObj={medication}
                  onUpdate={getMeds}
                />
              ))}
            </>
          )}
        </Card>
      )}
    </>
  );
}

PetCard.propTypes = {
  petObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    age: PropTypes.string,
    breed: PropTypes.string,
    action: PropTypes.string,
    medication: PropTypes.string,
    firebaseKey: PropTypes.string,
    isDeleted: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
