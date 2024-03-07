import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    usn: '',
    password: '',
  });

  const [formError, setFormError] = useState({
    usn: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormError({ ...formError, [name]: '' });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that both fields are not empty
    if (!formData.usn.trim() || !formData.password.trim()) {
      setFormError({
        usn: formData.usn.trim() ? '' : 'USN is required',
        password: formData.password.trim() ? '' : 'Password is required',
      });
      return;
    }

    try {
      const { usn, password } = formData;

      const response = await axios.post('http://localhost:8800/student-check', {
        usn,
        password,
      });

      // Handle server response
      if (response.data.exists) {
        console.log(response);

        navigate('/user-dashboard', { state: { usn } });

      } else {
        navigate('/student-register');
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div>
      <div>
        <h3>Student Login</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="student-username">USN</label>
          <input
            type="text"
            id="student-username"
            name="usn" // Change from "username" to "usn"
            value={formData.usn}
            onChange={handleChange}
          />
          {formError.usn && <p style={{ color: 'red' }}>{formError.usn}</p>}

          <label htmlFor="student-password">Password:</label>
          <input
            type="password"
            id="student-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {formError.password && <p style={{ color: 'red' }}>{formError.password}</p>}

          <button type="submit">Login as Student</button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
