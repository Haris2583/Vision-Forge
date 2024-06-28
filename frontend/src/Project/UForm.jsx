import React, { useState } from 'react';
import './CareerForm.css'; // Assuming CareerForm.css is in the same directory

const CareerForm = () => {
  const [formData, setFormData] = useState({
    interMarks: '',
    matricMarks: '',
    selectedCourse: '',
  });

  const courses = ['Engineering', 'Computer Science', 'Business Administration'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Add your submission logic here
  };

  return (
    <div className="career-form-container"> {/* Added a container class */}
      <h2 className="career-form-title">Search Universities</h2> {/* Added heading class */}
      <form className="career-form" onSubmit={handleSubmit}>
        <div className="career-form-group">
          <label className="career-form-label" htmlFor="interMarks">Inter Marks (%)</label>
          <input
            type="number"
            id="interMarks"
            name="interMarks"
            value={formData.interMarks}
            onChange={handleChange}
            className="career-form-input" 
            required
          />
        </div>
        <div className="career-form-group">
          <label className="career-form-label" htmlFor="matricMarks">Matric Marks (%)</label>
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
          <label className="career-form-label" htmlFor="selectedCourse">Course</label>
          <select
            id="selectedCourse"
            name="selectedCourse"
            value={formData.selectedCourse}
            onChange={handleChange}
            className="career-form-select" 
            required
          >
            <option value="">Select Course</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="career-form-submit">Submit</button> {/* Added submit button class */}
      </form>
    </div>
  );
};

export default CareerForm;
