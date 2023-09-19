import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getPets } from '../../api/petData';
import { createMedication, updateMedication } from '../../api/medicationData';

const initialState = {
  name: '',
  pet_id: '',
  type: '',
  quantity: '',
  instructions: '',
};

const medicationTypes = ['Amicillian', 'Apoquel', 'Bravecto', 'Carprofen', 'CBD Treats', 'Fenbendazole', 'Front Line', 'Gabeptin', 'Heartgard', 'Meloxicam', 'Metronidazole', 'Nexgard', 'Penylpropanolamine', 'Prednisone', 'Simperica Trio', 'Trazadone'];

function MedicationForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  useEffect(() => {
    getPets(user.uid).then((petsData) => setPets(petsData));
  }, [user]);

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      if (value === 'Other') {
        setIsOtherSelected(true);
        // Set the value of the name field to "Other" when "Other" is selected
        setFormInput((prevState) => ({
          ...prevState,
          [name]: 'Other',
        }));
      } else {
        setIsOtherSelected(false);
        // Set the value of the name field to the entered value when "Other" is not selected
        setFormInput((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
      console.log('Name:', name);
      console.log('Value:', value);
      console.log('isOtherSelected:', isOtherSelected);
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMedication(formInput).then(() => router.push(`/medication/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMedication(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMedication(patchPayload).then(() => {
          router.push('/pet');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Medication</h2>

      <FloatingLabel controlId="floatingInput1" label="" className="mb-3">
        <select
          id="medication-name"
          name="name"
          value={isOtherSelected ? 'Other' : formInput.name}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Medication Name</option>
          {medicationTypes.map((type, index) => (
          // eslint-disable-next-line react/no-array-index-key
            <option key={index} value={type}>
              {type}
            </option>
          // eslint-disable-next-line indent
          ))}
          <option value="Other">Other</option>
        </select>
      </FloatingLabel>

      {isOtherSelected && (
      <FloatingLabel controlId="floatingInput5" label="Other Medication" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Other Medication"
          name="otherMedication"
          value={formInput.otherMedication}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      )}

      <FloatingLabel controlId="floatingSelect" label="Pet">
        <Form.Select
          aria-label="Pet"
          name="pet_id"
          isDeleted="false"
          onChange={handleChange}
          className="mb-3"
        >
          <option value="">Select a Pet</option>
          {pets
            .filter((pet) => !pet.isDeleted)
            .map((pet) => (
              <option
                key={pet.firebaseKey}
                value={pet.firebaseKey}
              >
                {pet.name}
              </option>
            ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Type" className="mb-3">
        <Form.Control type="text" placeholder="Type" name="type" value={formInput.type} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Quantity" className="mb-3">
        <Form.Control type="text" placeholder="Quantity" name="quantity" value={formInput.quantity} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Instructions" className="mb-3">
        <Form.Control type="text" placeholder="Instructions" name="instructions" value={formInput.instructions} onChange={handleChange} required />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Medication</Button>
    </Form>
  );
}

MedicationForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    pet_id: PropTypes.string,
    type: PropTypes.string,
    quantity: PropTypes.string,
    instructions: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MedicationForm.defaultProps = {
  obj: initialState,
};

export default MedicationForm;
