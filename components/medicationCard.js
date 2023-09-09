import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleMedication } from '../api/medicationData';

function MedicationCard({ medicationObj, onUpdate }) {
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
        <Card.Title>{medicationObj.pet_name}</Card.Title>
        <Link href={`/medication/${medicationObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/medication/edit/${medicationObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT MEDICATION</Button>
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
    pet_name: PropTypes.arrayOf(PropTypes.string),
    email: PropTypes.string,
    firebaseKey: PropTypes.string,
    quantity: PropTypes.string,
    instructions: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MedicationCard;
