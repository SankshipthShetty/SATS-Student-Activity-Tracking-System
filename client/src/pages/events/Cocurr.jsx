import React, { useState } from 'react';
import axios from 'axios';

const Cocurr = () => {
  const [formData, setFormData] = useState({
    usn: '',
    price: '',
    venue: '',
    date: '',
    certificate: null, // Use null to represent the file
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
    formDataForServer.append('price', formData.price);
    formDataForServer.append('venue', formData.venue);
    formDataForServer.append('date', formData.date);
    formDataForServer.append('certificate', formData.certificate); // This is where the file is appended

    try {
      // Send formDataForServer to your server using axios
      const response = await axios.post('http://localhost:8800/cocurr', formDataForServer, {
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
      <h2>Cocurr Form</h2>
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
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
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
          <label htmlFor="certificate">Certificate:</label>
          <input
            type="file"
            id="certificate"
            name="certificate"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Cocurr;
