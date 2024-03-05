import axios from 'axios';
import React from 'react'
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    branch: '',
    password: '',
    fname: '',
    lname: '',
    faculty_no: '',
  });

const navigate=useNavigate();

   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { branch, password, fname, lname, faculty_no } = formData;
      await axios.post('http://localhost:8800/admin-register', {
        branch,
        password,
        fname,
        lname,
        faculty_no,
      
      });
      navigate('/');
    } catch (err) {
      // Handle the error here
      console.log(err);
    }

    console.log(formData);
  };

  return (
    <div>
     <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="branch">Branch:</label>
        <input
          type="text"
          id="branch"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="fname">First Name:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="lname">Last Name:</label>
        <input
          type="text"
          id="lname"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="faculty_no">Faculty Number:</label>
        <input
          type="text"
          id="faculty_no"
          name="faculty_no"
          value={formData.faculty_no}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
     


    </div>
  )
}

export default AdminRegister