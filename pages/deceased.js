import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import RememberPets from '../components/rememberPets';
import { getDeletedPets } from '../api/petData';

function Deceased() {
  const [deceaseds, setDeceaseds] = useState([]);
  const { user } = useAuth();

  const getAllTheDeletedPets = useCallback(() => {
    getDeletedPets(user.uid).then((deletedPetsData) => {
      setDeceaseds(deletedPetsData);
    });
  }, [user.uid]);

  useEffect(() => {
    getAllTheDeletedPets();
  }, [getAllTheDeletedPets]);

  return (
    <div className="text-center my-4">
      <Link passHref href="/pet/new">
        <Button>Add A Pet</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {deceaseds.map((pet) => (
          <RememberPets
            key={pet.firebaseKey}
            petObj={pet}
            onUpdate={getDeletedPets}
          />
        ))}
      </div>
    </div>
  );
}

export default Deceased;
