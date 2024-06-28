import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CareerForm.css'; // New CSS file for CareerForm

const CareerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    matricField: '',
    matricMarks: '',
    intermediateField: '',
    intermediateMarks: '',
    interest1: '',
    interest2: '',
    interest3: ''
  });

  const interestsOptions = [
    'Accounts', 'Aeroplanes', 'Animal Welfare', 'Artificial Intelligence', 'Business Management', 'Chemistry',
    'Construction', 'Creative Writing', 'Dentist', 'Law', 'Logic Building/Games development', 'Mechanics',
    'Physician', 'Physiotherapy', 'Reporting', 'Robotics', 'Software/System Building', 'Technician/Network Engineer'
  ];

  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Set submitting state to true

    // Form validation
    if (!formData.name || !formData.matricField || !formData.matricMarks || !formData.intermediateField || !formData.intermediateMarks || !formData.interest1 || !formData.interest2 || !formData.interest3) {
      toast.error('All fields are required!');
      setSubmitting(false); // Reset submitting state
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/submit', formData);
      console.log('Response from server:', response.data); // Log the entire response for debugging

      if (response.data.predictions && response.data.predictions.length > 0) {
        // Redirect to career result page with recommended courses
        navigate('/careerresult', { state: { recommendedCourses: response.data.predictions } });
        toast.success('Form submitted successfully!');
      } else {
        // Handle case where no recommendations are found
        toast.warn('No recommendations found for the provided data.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Submission failed. Please try again.');
    } finally {
      setSubmitting(false); // Reset submitting state in finally block
    }
  };

  return (
    <div className="career-form-container">
      <h1 className="career-form-title">Select A Career</h1>
      <form onSubmit={handleSubmit} className="career-form">
        <div className="career-form-group">
          <label htmlFor="name" className="career-form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="career-form-input"
            required
          />
        </div>
        <div className="career-form-group">
          <label htmlFor="matricField" className="career-form-label">Matriculation Field</label>
          <select
            id="matricField"
            name="matricField"
            value={formData.matricField}
            onChange={handleChange}
            className="career-form-select"
            required
          >
            <option value="">Select</option>
            <option value="Arts">Arts</option>
            <option value="Biology">Biology</option>
            <option value="Computer">Computer</option>
          </select>
        </div>
        <div className="career-form-group">
          <label htmlFor="matricMarks" className="career-form-label">Matriculation Marks</label>
          <input
            type="number"
            id="matricMarks"
            name="matricMarks"
            value={formData.matricMarks}
            onChange={handleChange}
            className="career-form-input"
            required
          />
        </div>
        <div className="career-form-group">
          <label htmlFor="intermediateField" className="career-form-label">Intermediate Field</label>
          <select
            id="intermediateField"
            name="intermediateField"
            value={formData.intermediateField}
            onChange={handleChange}
            className="career-form-select"
            required
          >
            <option value="">Select</option>
            <option value="ICS">ICS</option>
            <option value="Pre-Engineering">Pre-Engineering</option>
            <option value="Pre-Medical">Pre-Medical</option>
            <option value="ICOM">ICOM</option>
          </select>
        </div>
        <div className="career-form-group">
          <label htmlFor="intermediateMarks" className="career-form-label">Intermediate Marks</label>
          <input
            type="number"
            id="intermediateMarks"
            name="intermediateMarks"
            value={formData.intermediateMarks}
            onChange={handleChange}
            className="career-form-input"
            required
          />
        </div>
        <div className="career-form-group">
          <label htmlFor="interest1" className="career-form-label">Interest 1</label>
          <select
            id="interest1"
            name="interest1"
            value={formData.interest1}
            onChange={handleChange}
            className="career-form-select"
            required
          >
            <option value="">Select</option>
            {interestsOptions.map((interest, index) => (
              <option key={index} value={interest}>{interest}</option>
            ))}
          </select>
        </div>
        <div className="career-form-group">
          <label htmlFor="interest2" className="career-form-label">Interest 2</label>
          <select
            id="interest2"
            name="interest2"
            value={formData.interest2}
            onChange={handleChange}
            className="career-form-select"
            required
          >
            <option value="">Select</option>
            {interestsOptions.map((interest, index) => (
              <option key={index} value={interest}>{interest}</option>
            ))}
          </select>
        </div>
        <div className="career-form-group">
          <label htmlFor="interest3" className="career-form-label">Interest 3</label>
          <select
            id="interest3"
            name="interest3"
            value={formData.interest3}
            onChange={handleChange}
            className="career-form-select"
            required
          >
            <option value="">Select</option>
            {interestsOptions.map((interest, index) => (
              <option key={index} value={interest}>{interest}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={submitting} className="career-form-submit">
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CareerForm;
