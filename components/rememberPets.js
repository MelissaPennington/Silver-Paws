import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import PetCard from './petCard';
import { getDeletedPets } from '../api/petData';

function RememberPets() {
  const [deletedPets, setDeletedPets] = useState([]);

  useEffect(() => {
    // Fetch deleted pets data when the component mounts
    getDeletedPets().then((deletedPetsData) => {
      setDeletedPets(deletedPetsData);
    });
  }, []);

  return (
    <div className="text-center my-4">
      <Link passHref href="/pet">
        <Button>Back to Pets</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {deletedPets.map((pet) => (
          <PetCard
            key={pet.firebaseKey}
            petObj={pet} // Pass the pet object to the PetCard component
          />
        ))}
      </div>
    </div>
  );
}

export default RememberPets;
