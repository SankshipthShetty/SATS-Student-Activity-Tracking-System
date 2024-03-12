import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const StudentLogin = () => {
  const [formData, setFormData] = useState({
    usn: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    usn: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormError({ ...formError, [name]: "" });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that both fields are not empty
    if (!formData.usn.trim() || !formData.password.trim()) {
      setFormError({
        usn: formData.usn.trim() ? "" : "USN is required",
        password: formData.password.trim() ? "" : "Password is required",
      });
      return;
    }

    try {
      const { usn, password } = formData;

      const response = await axios.post("http://localhost:8800/student-check", {
        usn,
        password,
      });

      // Handle server response
      if (response.data.exists) {
        console.log(response);

        navigate("/user-dashboard", { state: { usn } });
      } else {
        navigate("/student-register");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (

    <form onSubmit={handleSubmit} className="bg-black p-4 rounded-md ">
  <label htmlFor="student-username" className='text-white font-bold'>University Seat Number (USN)</label>
  <input
    type="text"
    id="student-username"
    name="usn"
    value={formData.usn}
    onChange={handleChange}
    className="mt-7 mb-7 appearance-none block w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
    placeholder="Enter your USN"
  />
  {formError.usn && <p style={{ color: 'red' }}>{formError.usn}</p>}

  <label htmlFor="student-password" className='text-white font-bold '>Password</label>
  <input
    type="password"
    id="student-password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    className="mt-6 mb-7 appearance-none block w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
    placeholder="Enter your password"
  />
  {formError.password && <p style={{ color: 'red' }}>{formError.password}</p>}

  <button type="submit" className="mt-2 ml-24 mb-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ">
    Login as Student
  </button>
</form>

  );
};

export default StudentLogin;
