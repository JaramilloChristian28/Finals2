import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientForm from './PatientForm';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Importing icons from react-icons
import './PatientList.css'; // Import the custom CSS file

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios.get('http://localhost:8000/api/patients')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the patients!', error);
        setErrorMessage('Error fetching patients');
      });
  };

  const deletePatient = (id) => {
    axios.delete(`http://localhost:8000/api/patients/${id}`)
      .then(() => {
        fetchPatients();
        setSuccessMessage('Patient deleted successfully');
      })
      .catch(error => {
        console.error('There was an error deleting the patient!', error);
        setErrorMessage('Error deleting patient');
      });
  };

  const handleAddPatient = () => {
    setCurrentPatientId(null);
    setShowModal(true);
  };

  const handleEditPatient = (id) => {
    setCurrentPatientId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (!successMessage) {
      setSuccessMessage('');
    }
    setShowModal(false);
    setErrorMessage('');
  };
  
  const handlePatientSaved = (message) => {
    fetchPatients();
    setSuccessMessage(message);
    setShowModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="patient-list-container">
        <h1>Patient List</h1>
        <button className="btn btn-outline-primary" onClick={handleAddPatient}>
          <FaPlus className="mr-1" /> Add Patient
        </button>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.patient_id}>
                <td>{patient.patient_id}</td>
                <td>{patient.patient_name}</td>
                <td>{patient.email_address}</td>
                <td>{patient.age}</td>
                <td>
                  <button className="btn btn-outline-warning" onClick={() => handleEditPatient(patient.patient_id)}>
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => deletePatient(patient.patient_id)}>
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <PatientForm
            id={currentPatientId}
            onClose={handleCloseModal}
            onPatientSaved={handlePatientSaved}
          />
        )}
      </div>
    </div>
  );
};

export default PatientList;
