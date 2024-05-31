import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientForm = ({ id, onClose, onPatientSaved }) => {
  const [patient, setPatient] = useState({
    patient_name: '',
    email_address: '',
    age: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/patients/${id}`)
        .then(response => {
          setPatient(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the patient!', error);
          setErrorMessage('Error fetching patient details');
        });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');

    const apiCall = id ? axios.put(`http://localhost:8000/api/patients/${id}`, patient) : axios.post('http://localhost:8000/api/patients/add', patient);

    apiCall
      .then(() => {
        onPatientSaved(id ? 'Patient updated successfully' : 'Patient added successfully');
        onClose();
      })
      .catch(error => {
        console.error('There was an error saving the patient!', error);
        setErrorMessage(error.response?.data?.message || 'Error saving patient');
      });
  };

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{id ? 'Edit Patient' : 'Add Patient'}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="patient_name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="patient_name"
                  name="patient_name"
                  value={patient.patient_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email_address">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email_address"
                  name="email_address"
                  value={patient.email_address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  value={patient.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Close</button>
                <button type="submit" className="btn btn-outline-primary">{id ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
