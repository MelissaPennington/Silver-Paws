import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { viewPetDetails } from '../../api/mergedData';
import PetCard from '../../components/petCard';
import { getSinglePet } from '../../api/petData';

export default function ViewPet() {
  const [pet, setPet] = useState({});
  // const [petDetails, setPetDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  const getPet = () => {
    getSinglePet(firebaseKey).then(setPet);
  };
  // const getPetDetails = (obj) => {
  //   viewPetDetails(obj.firebaseKey).then(setPetDetails);
  // }
  useEffect(() => {
    getPet();
  }, [firebaseKey]);

  return (
    <PetCard petObj={pet} onUpdate={getPet} />
  );
}
