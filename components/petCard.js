import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSinglePet } from '../api/petData';

export default function PetCard({ petObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisPet = () => {
    if (window.confirm(`Delete ${petObj.name}?`)) {
      deleteSinglePet(petObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={petObj.image} alt={petObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{petObj.name}</Card.Title>
        <Card.Title>{petObj.age}</Card.Title>
        <Card.Title>{petObj.breed}</Card.Title>
        <Card.Title>{petObj.action}</Card.Title>
        <Card.Title>{petObj.medication}</Card.Title>
        {/* DYNAMIC LINK TO EDIT THE MEMBER DETAILS  */}
        <Link href={`/pet/edit/${petObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPet} className="m-2">
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
