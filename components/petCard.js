import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteSinglePet } from '../api/petData';
import { getMedicationbyPet } from '../api/medicationData';
import MedicationCard from './medicationCard';

export default function PetCard({ petObj, onUpdate }) {
  const router = useRouter();
  const [medications, setMedications] = useState([]);

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
      deleteSinglePet(petObj.firebaseKey).then(() => {
        onUpdate();
        router.push('/remember');
      });
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      {petObj.image && (
        <Card.Img variant="top" src={petObj.image} alt={petObj.name} style={{ height: '400px' }} />
      )}
      <Card.Body>
        <Card.Title>{petObj.name}</Card.Title>
        <Card.Title>{petObj.age}</Card.Title>
        <Card.Title>{petObj.breed}</Card.Title>
        <Card.Title>{petObj.action}</Card.Title>
        <Card.Title>{petObj.medication}</Card.Title>
        {/* Render medications */}
        <h5>Medications:</h5>
        {medications.length > 0 ? (
          medications.map((medication) => (
            // <div key={medication.firebaseKey}>
            //   <p>{medication.name}</p>
            //   <p>Type: {medication.type}</p>
            //   <p>Quantity: {medication.quantity}</p>
            // </div>
            <MedicationCard medicationObj={medication} onUpdate={getMeds} />
          ))
        ) : (
          <p>No medications found.</p>
        )}

        <Link href={`/pet/${petObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/pet/edit/${petObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteAndNavigateToRemember} className="m-2">
          R.I.P.
        </Button>
      </Card.Body>
    </Card>
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
