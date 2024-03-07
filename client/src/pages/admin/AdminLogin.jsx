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
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="m-10 border rounded-md p-14 hover:shadow-md transition duration-300">
        <h3 className="text-center mb-4">Admin Login</h3>
        <form onSubmit={handleSubmit} className="text-left">
          <label htmlFor="admin-username ">Username:</label>
          <Input
            type="text"
            id="admin-username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mb-2"
          />
          {formError.username && (
            <p style={{ color: "red" }}>{formError.username}</p>
          )}

          <label htmlFor="admin-password">Password:</label>
          <Input
            type="password"
            id="admin-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mb-2"
          />
          {formError.password && (
            <p style={{ color: "red" }}>{formError.password}</p>
          )}

          {/* Add a field to input department information */}
          <label htmlFor="admin-department">Department:</label>
          <Input
            type="text"
            id="admin-department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mb-4"
          />

          <Button type="submit">Login as Admin</Button>
        </form>
      </div>
      <Link to="/admin-register" className="mt-4">
        <Button className="">Admin Register</Button>
      </Link>
    </div>
  );
}

export default AdminLogin;
