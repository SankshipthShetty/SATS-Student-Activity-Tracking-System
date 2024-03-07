import React from "react";
// import { Link } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import StudentLogin from "./student/StudentLogin";
// import { Button } from "../components/ui/button";

function Home() {
  return (
    <div className="flex flex-col items-center  justify-center h-screen">
      <div className="flex space-x-24">
        {/* Admin Login */}
        <div className="mr-4">
          <AdminLogin />
        </div>

        {/* Student Login */}
        <div>
          <StudentLogin />
        </div>
      </div>
    </div>
  );
}

export default Home;
