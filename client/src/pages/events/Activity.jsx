import React, { useState } from 'react';
import axios from 'axios';

const Activity = () => {
  const [formData, setFormData] = useState({
    usn: '',
    venue: '',
    proof: null,
    document:'', // Use null to represent the file
    date: '',
    points: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Use a conditional to handle file input separately
    const newValue = type === 'file' ? e.target.files[0] : value;

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file upload
    const formDataForServer = new FormData();
    formDataForServer.append('usn', formData.usn);
    formDataForServer.append('venue', formData.venue);
    formDataForServer.append('proof', formData.proof); // This is where the file is appended
    formDataForServer.append('date', formData.date);
    formDataForServer.append('points', formData.points);

    try {
      // Send formDataForServer to your server using axios
      const response = await axios.post('http://localhost:8800/activity', formDataForServer, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from the server
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>achivement Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="usn">USN:</label>
          <input
            type="text"
            id="usn"
            name="usn"
            value={formData.usn}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="venue">Venue:</label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="proof">Proof:</label>
          <input
            type="file"
            id="proof"
            name="proof"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="doc">doc:</label>
          <input
            type="text"
            id="doc"
            name="doc"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="points">Points:</label>
          <input
            type="number"
            id="points"
            name="points"
            value={formData.points}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Activity;
