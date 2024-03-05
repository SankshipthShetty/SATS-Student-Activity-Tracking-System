import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [formError, setFormError] = useState({
    username: '',
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
    if (!formData.username.trim() || !formData.password.trim()) {
      setFormError({
        username: formData.username.trim() ? '' : 'Username is required',
        password: formData.password.trim() ? '' : 'Password is required',
      });
      return;
    }

    try {
      const { username, password } = formData;

      const response = await axios.post('http://localhost:8800/student-check', {
        username,
        password,
      });

      // Handle server response
      if (response.data.exists) {
        console.log(response);
        navigate('/dashboard');
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
          <label htmlFor="student-username">Username (USN):</label>
          <input
            type="text"
            id="student-username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {formError.username && <p style={{ color: 'red' }}>{formError.username}</p>}

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
