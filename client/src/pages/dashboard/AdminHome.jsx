import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
} from "../../components/ui/card";


const AdminHome = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Retrieve department from cookie
    const department = document.cookie
      .split("; ")
      .find((row) => row.startsWith("department="))
      .split("=")[1];

    // Fetch users based on department
    axios
      .get(`http://localhost:8800/fetch-users?department=${department}`)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <div style={{ overflow: 'hidden' }} className="min-h-screen bg-black flex flex-col top-20 justify-start items-center py-16">
    <Button variant="secondary" className="absolute text-white font-bold border-white border-2 top-10 left-10 p-6  ">
       Log Out
      </Button>
 <h1 className="gradient-text text-transparent text-5xl font-bold text-center animate-gradient mt-0 mb-8">Welcome back! </h1>
 <h1 className="font-bold text-white text-3xl mb-20">Department:{" "}
        {
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("department="))
            .split("=")[1]
        }
        </h1>

    <Card className="w-5/6" >
      {/* Display users */}
      <ul className="list-none p-6">
        {" "}
        {/* Add padding here */}
        {users.map((user, index) => (
          <div
            key={user.usn}
            className={`flex items-center  justify-between mb-2${
              index < users.length - 1 ? " pb-2 border-b" : ""
            }`}
          >
            <div className="mr-4 text-white font-bold">
              
            {user.fname} - {user.usn} 
            </div>
            <div className="flex space-x-4 text-white ">
              <Link to={`/view-activity/${user.usn}`}>
                <Button className="font-bold text-white border-2">Activity</Button>
              </Link>
              <Link to={`/view-cocurr/${user.usn}`}>
                <Button className="font-bold text-white border-2">Co-Curricular</Button>
              </Link>
            </div>
          </div>
        ))}
      </ul>
    </Card>
    </div>
    
  );
};

export default AdminHome;
