import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

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
    <div className="mb-6">
      <p className="mb-4 p-4 text-xl">
        Department:{" "}
        {
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("department="))
            .split("=")[1]
        }
      </p>

      {/* Display users */}
      <ul className="list-none p-6">
        {" "}
        {/* Add padding here */}
        {users.map((user, index) => (
          <div
            key={user.usn}
            className={`flex items-center justify-between mb-2${
              index < users.length - 1 ? " pb-2 border-b" : ""
            }`}
          >
            <div className="mr-4">
              
            {user.fname} - {user.usn} 
            </div>
            <div className="flex space-x-4">
              <Link to={`/view-activity/${user.usn}`}>
                <Button>activity</Button>
              </Link>
              <Link to={`/view-cocurr/${user.usn}`}>
                <Button>co-curr</Button>
              </Link>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AdminHome;
