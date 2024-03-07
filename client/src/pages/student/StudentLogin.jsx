import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="m-10 border rounded-md p-10 hover:shadow-md transition duration-300">
        <h3 className="text-center mb-4">Student Login</h3>
        <form onSubmit={handleSubmit} className="text-left">
          <label htmlFor="student-username">USN:</label>
          <Input
            type="text"
            id="student-username"
            name="usn"
            value={formData.usn}
            onChange={handleChange}
            className="mb-2"
          />
          {formError.usn && <p style={{ color: "red" }}>{formError.usn}</p>}

          <label htmlFor="student-password">Password:</label>
          <Input
            type="password"
            className="mb-4"
            id="student-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {formError.password && (
            <p style={{ color: "red" }}>{formError.password}</p>
          )}

          <Button type="submit">Login as Student</Button>
        </form>
      </div>
      <Link to="/student-register" className="mt-4">
        <Button className="">Student Register</Button>
      </Link>
    </div>
  );
};

export default StudentLogin;
