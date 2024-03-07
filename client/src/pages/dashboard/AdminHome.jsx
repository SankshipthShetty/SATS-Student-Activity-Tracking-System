import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Retrieve department from cookie
    const department = document.cookie
      .split('; ')
      .find(row => row.startsWith('department='))
      .split('=')[1];

    // Fetch users based on department
    axios
      .get(`http://localhost:8800/fetch-users?department=${department}`)
      .then(response => {
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <div>
      <h3>Dashboard</h3>
      <p>Department: {document.cookie.split('; ').find(row => row.startsWith('department=')).split('=')[1]}</p>

      {/* Display users */}
      <ul>
        {users.map(user => (
          <div key={user.usn}>
            <button>{user.usn} {user.fname}</button>
            <Link to={`/view-activity/${user.usn}`}>
              <button>activity</button>
            </Link>
            <Link to={`/view-cocurr/${user.usn}`}>
              <button>co-curr</button>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AdminHome;
