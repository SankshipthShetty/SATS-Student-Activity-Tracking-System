import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const UserHome = () => {
  const [userData, setUserData] = useState({});
  const location = useLocation(); // useLocation hook to access state from navigate

  // Access the state from the location object
  const usnFromState = location.state && location.state.usn;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/get-user/${usnFromState}`);
        
        
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [usnFromState]);

  
  return (
    <div>
      <h1>User Home</h1>
      <h3>Student {usnFromState}</h3>
      <p>Branch: {userData.branch}</p>
      <div>
      <Link to="/cocurrecular">
        cocurrecular
      </Link>
      </div>
      
      <Link to="/activity">
        activity
      </Link>
    </div>
  );
};

export default UserHome;
