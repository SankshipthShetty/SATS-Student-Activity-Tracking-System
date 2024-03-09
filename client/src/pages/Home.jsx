import React from "react";
import { Link } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import StudentLogin from "./student/StudentLogin";
import { Button } from "../components/ui/button";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

function Home() {
  return (
    <div style={{ overflow: 'hidden' }} className="min-h-screen bg-black flex flex-col top-20 justify-center items-center py-16" >
      <p className="gradient-text text-transparent text-5xl font-bold text-center animate-gradient mt-0 mb-32 ">STUDENT ACTIVITY MANAGEMENT SYSTEM</p>
      
      <div className="mt-8 flex gap-40 ">
        <Card className="w-96 h-98">
          <CardHeader>
            <CardTitle className="text-white text-center font-bold text-lg">ADMIN LOGIN</CardTitle>
          </CardHeader>
           <AdminLogin/>
           <p className="text-white text-center font-bold ">Don't have an account?</p>
           <CardFooter className="flex justify-center items-center mt-4">
           
            <Link to="/admin-register">
              <Button className="mt-2 ml-19 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Register</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="w-96 h-98">
          <CardHeader>
            <CardTitle className="text-white text-center font-bold text-lg">STUDENT LOGIN</CardTitle>
          </CardHeader>
           <StudentLogin/>
           <p className="text-white text-center font-bold ">Don't have an account?</p>
           <CardFooter className="flex justify-center items-center mt-4">
            <Link to="/student-register">
              <Button className="mt-2 ml-19 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Register</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Home;
