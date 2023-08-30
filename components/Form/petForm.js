import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getMedicationbyPet } from '../../api/medicationData';
import { createPet, updatePet } from '../../api/petData';

const initialState = {
  name: '',
  image: '',
  age: '',
  breed: false,
  actions: '',
  medications: '',
};

function PetForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [setMedications] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getMedicationbyPet(user.uid).then(setMedications);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

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
          router.push('/');
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

      {/* AUTHOR SELECT  */}
      {/* <FloatingLabel controlId="floatingSelect" label="Medication">
        <Form.Select
          aria-label="Medication"
          name="medication_id"
          onChange={handleChange}
          className="mb-3"
        >
          <option value="">Select any Medications</option>
          {
            // eslint-disable-next-line no-shadow
            medication.map((medication) => (
              <option
                key={medication.firebaseKey}
                value={medication.firebaseKey}
              >
                {medication.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel> */}

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Actions" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Actions"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="breed"
        name="breed"
        label="breed type?"
        checked={formInput.breed}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            sale: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Pet</Button>
    </Form>
  );
}

PetForm.propTypes = {
  obj: PropTypes.shape({
    actions: PropTypes.string,
    image: PropTypes.string,
    age: PropTypes.string,
    breed: PropTypes.bool,
    name: PropTypes.string,
    medication_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PetForm.defaultProps = {
  obj: initialState,
};

export default PetForm;
