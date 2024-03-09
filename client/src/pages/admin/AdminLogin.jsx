import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

function AdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    department: "", // Add department to state
  });

  const [formError, setFormError] = useState({
    username: "",
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
    if (!formData.username.trim() || !formData.password.trim()) {
      setFormError({
        username: formData.username.trim() ? "" : "Username is required",
        password: formData.password.trim() ? "" : "Password is required",
      });
      return;
    }

    try {
      const { username, password, department } = formData; // Include department in the request

      const response = await axios.post("http://localhost:8800/admin-check", {
        username,
        password,
        department,
      });

      // Handle server response
      if (response.data.exists) {
        document.cookie = `department=${department}`;
        console.log(response);
        navigate("/dashboard");
      } else {
        navigate("/admin-register");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
   
     <form onSubmit={handleSubmit} className="bg-black p-4 rounded-md ">
      <label htmlFor="admin-username" className='text-white font-bold'>Username</label>
      <input
        type="text"
        id="admin-username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className="mt-2 mb-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
        placeholder="Enter your username"
      />
      {formError.username && <p style={{ color: 'red' }}>{formError.username}</p>}

      <label htmlFor="admin-password"  className='text-white font-bold '>Password</label>
      <input
        type="password"
        id="admin-password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="mt-2 mb-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
        placeholder="Enter your password"
      />
      {formError.password && <p style={{ color: 'red' }}>{formError.password}</p>}

      {/* Add a field to input department information */}
      <label htmlFor="admin-department" className='text-white font-bold'>Department</label>
      <input
        type="text"
        id="admin-department"
        name="department"
        value={formData.department}
        onChange={handleChange}
        className="mt-2 mb-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
        placeholder="Enter your department"
      />

      <button type="submit" className="mt-2 ml-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ">
        Login as Admin
      </button>
    </form>
   
  );
}

export default AdminLogin;
