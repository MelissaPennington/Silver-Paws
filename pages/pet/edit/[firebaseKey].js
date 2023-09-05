import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePet } from '../../../api/petData';
import PetForm from '../../../components/Form/petForm';

export default function EditPet() {
  const [editPet, setEditPet] = useState([]); // Initialize as an empty array
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSinglePet(firebaseKey).then(setEditPet);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<PetForm obj={editPet} />);
}
