import React from 'react';
import PropTypes from 'prop-types';

function RememberPets({ pet }) {
  return (
    <div className="text-center my-4">
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
