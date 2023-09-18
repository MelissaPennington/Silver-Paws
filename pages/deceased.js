import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../utils/context/authContext';
import RememberPets from '../components/rememberPets';
import { getDeletedPets } from '../api/petData'; // Import the correct function

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
      <div className="d-flex flex-wrap">
        {deceaseds.map((pet) => (
          <RememberPets
            key={pet.firebaseKey}
            pet={pet}
            // onUpdate={getAllTheDeletedPets}
          />
        ))}
      </div>
    </div>
  );
}

export default Deceased;
