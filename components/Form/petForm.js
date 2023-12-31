import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPet, updatePet } from '../../api/petData';

const initialState = {
  name: '',
  image: '',
  age: '',
  breed: '',
  action: '',
  medication_id: '',
};

function PetForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePet(formInput).then(() => router.push(`/pet/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPet(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePet(patchPayload).then(() => {
          router.push('/pet');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Pet</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Pet's Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Pet's name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Pet's Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Pet's Age" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter age"
          name="age"
          value={formInput.age}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* ACTION INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Breed" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Breed"
          name="breed"
          value={formInput.breed}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* ACTION INPUT  */}
      <FloatingLabel controlId="floatingInput5" label="Action" className="mb-5">
        <Form.Control
          type="text"
          placeholder="Action"
          name="action"
          value={formInput.action}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Pet</Button>

    </Form>
  );
}

PetForm.propTypes = {
  obj: PropTypes.shape({
    action: PropTypes.string,
    image: PropTypes.string,
    age: PropTypes.string,
    breed: PropTypes.string,
    name: PropTypes.string,
    medication_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PetForm.defaultProps = {
  obj: initialState,
};

export default PetForm;
