import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleMedication, getMedicationbyPet } from '../api/medicationData';

function MedicationCard({ medicationObj, onUpdate }) {
  const [medications, setMedications] = useState([]);

  const getMedicationsForPet = useCallback(() => {
    if (Array.isArray(medicationObj.pet_id) && medicationObj.pet_id.length > 0) {
      // Fetch medications for the pet using its pet_id
      getMedicationbyPet(medicationObj.pet_id[0]) // Assuming there's only one pet_id for the medication
        .then((meds) => {
          setMedications(meds || []);
        })
        .catch((error) => {
          console.error('Error fetching medications for pet:', error);
          setMedications([]);
        });
    }
  }, [medicationObj.pet_id]);

  useEffect(() => {
    getMedicationsForPet();
  }, [getMedicationsForPet]);

  const deleteThisMedication = () => {
    if (window.confirm(`Delete ${medicationObj.name}?`)) {
      deleteSingleMedication(medicationObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '16rem', margin: '10px' }}>
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
        <div className="d-flex justify-content-between align-items-center">
          <Link href={`/medication/${medicationObj.firebaseKey}`} passHref>
            <Button variant="light" size="sm">VIEW</Button>
          </Link>
          <Link href={`/medication/edit/${medicationObj.firebaseKey}`} passHref>
            <Button variant="secondary" size="sm">EDIT</Button>
          </Link>
          <Button variant="danger" size="sm" onClick={deleteThisMedication}>
            DELETE
          </Button>
        </div>
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
