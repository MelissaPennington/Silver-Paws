import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import PetCard from '../components/petCard';
import { getPets } from '../api/petData';

function Pets() {
  const [pets, setPets] = useState([]);
  const { user } = useAuth();

  const getAllThePets = useCallback(() => {
    getPets(user.uid).then(setPets);
  }, [user.uid]);

  useEffect(() => {
    getAllThePets();
  }, [getAllThePets]);
  // this is a comment
  return (
    <div className="text-center my-4">
      <Link passHref href="/pet/new">
        <Button>Add A Pet</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {pets.map((pet) => (
          <PetCard
            key={pet.firebaseKey}
            petObj={pet}
            onUpdate={getAllThePets}
          />
        ))}
      </div>
    </div>
  );
}

export default Pets;
