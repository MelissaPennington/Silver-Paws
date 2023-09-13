import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getDeletedPets } from '../api/petData'; // Import getDeletedPets
import { useAuth } from '../utils/context/authContext';

function RememberPets() {
  const [deletedPets, setDeletedPets] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getDeletedPets(user.uid)
      .then((deletedPetsData) => {
        setDeletedPets(deletedPetsData);
      })
      .catch((error) => {
        console.error('Error fetching deleted pets:', error);
      });
  }, [user.uid]);

  return (
    <div className="text-center my-4">
      <Link passHref href="/pet">
        <Button>Back to Pets</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {deletedPets.map((pet) => (
          <div key={pet.firebaseKey} className="m-2">
            <img
              src={pet.image}
              alt={pet.name}
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            <p>{pet.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RememberPets;
