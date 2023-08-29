import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMedication, updateMedication } from '../../api/medicationData';

const initialState = {
  name: '',
  type: '',
  quanity: '',
  instructions: '',
};

function MedicationForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMedication(formInput).then(() => router.push(`/medication/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMedication(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMedication(patchPayload).then(() => {
          router.push('/medication');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Medication</h2>

      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="Name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Last Name" className="mb-3">
        <Form.Control type="text" placeholder="Type" name="Type" value={formInput.type} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Quanity" className="mb-3">
        <Form.Control type="text" placeholder="Quanity" name="image" value={formInput.quanity} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Instructions" className="mb-3">
        <Form.Control type="text" placeholder="Instructions" name="instructions" value={formInput.instructions} onChange={handleChange} required />
      </FloatingLabel>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Medication</Button>
    </Form>
  );
}

MedicationForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    quanity: PropTypes.string,
    instructions: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MedicationForm.defaultProps = {
  obj: initialState,
};

export default MedicationForm;
