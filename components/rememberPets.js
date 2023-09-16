import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getDeletedPets } from '../api/petData'; // Import getDeletedPets
import { useAuth } from '../utils/context/authContext';

function RememberPets() {
  const [deletedPets, setDeletedPets] = useState([]);
  const { user } = useAuth();

  const getAllTheDeletedPets = () => {
    getDeletedPets(user.uid).then(setDeletedPets);
  };

  useEffect(() => {
    getAllTheDeletedPets();
  }, []);

  return (
    <div className="text-center my-4">
      <Link passHref href="/pet">
        <Button>Back to Pets</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {deletedPets.map((pet) => (
          pet.isDeleted ? (
    // eslint-disable-next-line react/jsx-indent
    <div key={pet.firebaseKey} className="m-2">
      <img
        src={pet.image}
        alt={pet.name}
        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
      />
      <p>{pet.name}</p>
    </div>
          ) : null
        ))}

      </div>
    </div>
  );
}

export default RememberPets;
