/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import PropTypes from 'prop-types';

function RememberPets({ pet }) {
  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        <div key={pet.firebaseKey} className="m-2 position-relative">
          {/* Image overlay */}
          <div
            style={{
              position: 'absolute',
              top: -157,
              left: 0,
              width: '95%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0)', // Adjust the overlay color and opacity
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          // eslint-disable-next-line react/jsx-no-comment-textnodes
          >
            {/* // eslint-disable-next-line react/jsx-no-comment-textnodes, react/jsx-no-comment-textnodes, react/jsx-no-comment-textnodes, react/jsx-no-comment-textnodes, react/jsx-no-comment-textnodes, react/jsx-no-comment-textnodes, react/jsx-no-comment-textnodes, react/jsx-no-comment-textnodes */}
            {/* Add your image here */}
            {/* // eslint-disable-next-line jsx-a11y/img-redundant-alt, jsx-a11y/img-redundant-alt */}
            <img
              src="https://user-images.githubusercontent.com/124536589/265879524-c8c78dce-f841-4a55-9c47-7e4d2dc067ef.png"
              alt="Overlay Image"
              style={{ maxWidth: '80%', maxHeight: '60%', objectFit: 'cover' }}
            />
          </div>

          {/* Pet image */}
          <img
            src={pet.image}
            alt={pet.name}
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
          />

          <p>{pet.name}</p>
        </div>
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

// import React from 'react';
// import PropTypes from 'prop-types';

// function RememberPets({ pet }) {
//   return (
//     <div className="text-center my-4">
//       <div className="d-flex flex-wrap">
//         {/* {deletedPetsToRender.map((pet) => ( */}
//         <div key={pet.firebaseKey} className="m-2">
//           <img
//             src={pet.image}
//             alt={pet.name}
//             style={{ width: '200px', height: '200px', objectFit: 'cover' }}
//           />
//           <p>{pet.name}</p>
//         </div>
//         {/* ))} */}
//       </div>
//     </div>
//   );
// }

// export default RememberPets;

// RememberPets.propTypes = {
//   pet: PropTypes.shape({
//     image: PropTypes.string,
//     name: PropTypes.string,
//     firebaseKey: PropTypes.string,
//     isDeleted: PropTypes.bool,
//   }).isRequired,
// };
