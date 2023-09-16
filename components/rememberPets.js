import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// import { getDeletedPets } from '../api/petData'; // Import your modified function
// import { useAuth } from '../utils/context/authContext';

function RememberPets({ pet }) {
  // const { user } = useAuth();
  // const [deceasedPets, setDeceasedPets] = useState([]);

  // const getAllDeceased = () => {
  //   getDeletedPets(user.uid)
  //     .then((pets) => {
  //       console.log('Fetched Pets from Firebase:', pets); // Add this console log
  //       setDeceasedPets(pets);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching pets:', error);
  //     });
  // };

  // useEffect(() => {
  //   getAllDeceased();
  // }, []);

  // // Filter pets with isDeleted set to true
  // const deletedPetsToRender = deceasedPets.filter((pet) => pet.isDeleted === true);

  // // Add a console log to check the contents of deletedPetsToRender
  // console.log('Deleted Pets to Render:', deletedPetsToRender);

  return (
    <div className="text-center my-4">
      <Link passHref href="/pet">
        <Button>Back to Pets</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* {deletedPetsToRender.map((pet) => ( */}
        <div key={pet.firebaseKey} className="m-2">
          <img
            src={pet.image}
            alt={pet.name}
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
          />
          <p>{pet.name}</p>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
}

export default RememberPets;

RememberPets.propTypes = {
  pet: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    isDeleted: PropTypes.bool,
  }).isRequired,
};
