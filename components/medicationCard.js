import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleMedication, getMedicationbyPet } from '../api/medicationData';

function MedicationCard({ medicationObj, onUpdate }) {
  const [medications, setMedications] = useState([]);

  const getMedicationsForPet = () => {
    if (Array.isArray(medicationObj.pet_id) && medicationObj.pet_id.length > 0) {
      // Fetch medications for the pet using its pet_id
      getMedicationbyPet(medicationObj.pet_id[0]) // Assuming there's only one pet_id for the medication
        .then((meds) => {
          console.log('Fetched medications for pet:', meds);
          setMedications(meds || []);
        })
        .catch((error) => {
          console.error('Error fetching medications for pet:', error);
          setMedications([]);
        });
    }
  };

  useEffect(() => {
    getMedicationsForPet();
  }, []);

  const deleteThisMedication = () => {
    if (window.confirm(`Delete ${medicationObj.name}?`)) {
      deleteSingleMedication(medicationObj.firebaseKey).then(() => onUpdate());
    }
  };

  console.warn(medicationObj);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{medicationObj.name}</Card.Title>
        {/* Display medications for the pet */}
        {medications.length > 0 && (
          <div>
            <h5>Medications for Pet:</h5>
            <ul>
              {medications.map((medication) => (
                <li key={medication.firebaseKey}>{medication.name}</li>
              ))}
            </ul>
          </div>
        )}
        <Link href={`/medication/${medicationObj.firebaseKey}`} passHref>
          <Button variant="light" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/medication/edit/${medicationObj.firebaseKey}`} passHref>
          <Button variant="secondary">EDIT MEDICATION</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMedication} className="m-2">
          DELETE MEDICATION
        </Button>
      </Card.Body>
    </Card>
  );
}

MedicationCard.propTypes = {
  medicationObj: PropTypes.shape({
    name: PropTypes.string,
    pet_id: PropTypes.arrayOf(PropTypes.string),
    email: PropTypes.string,
    firebaseKey: PropTypes.string,
    quantity: PropTypes.string,
    instructions: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MedicationCard;
