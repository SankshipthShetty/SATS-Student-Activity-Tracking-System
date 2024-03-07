import React from "react";
import { Link } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import StudentLogin from "./student/StudentLogin";
import { Button } from "../components/ui/button";

function Home() {
  return (
    <div className="bg-gray-100 p-4">
      <AdminLogin />

      <StudentLogin />

      <div className="mt-4">
        <Link to="/admin-register">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Admin Register
          </button>
        </Link>
        <Link to="/student-register" className="ml-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Student Register
          </button>
          <Button>Button</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
