import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import './App.css'; // Import the custom CSS file

const App = () => {
  return (
    <Router>
      <div className="app-container"> {/* Use a custom CSS class for the container */}
        <div className="content">
          <Routes>
            <Route path="/" element={<PatientList />} />
            <Route path="/add" element={<PatientForm />} />
            <Route path="/edit/:id" element={<PatientForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
