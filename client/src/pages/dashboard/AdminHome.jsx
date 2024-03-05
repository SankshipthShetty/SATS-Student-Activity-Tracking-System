import React,{ useEffect, useState } from 'react'
import axios from 'axios';
const AdminHome = () => {


    const [users, setUsers] = useState([]);
    useEffect(() => {
        // Retrieve department from cookie
        const department = document.cookie
          .split('; ')
          .find(row => row.startsWith('department='))
          .split('=')[1];
    
        // Fetch users based on department
        axios.get(`http://localhost:8800/fetch-users?department=${department}`)
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
            //   <li key={user.usn}>{user.fname}</li>
              <div><button key={user.usn}>{user.usn}  {user.fname}</button></div>
              
              
            ))}
          </ul>
        </div>
      );
    }

export default AdminHome