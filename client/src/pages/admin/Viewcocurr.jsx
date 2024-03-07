import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewCocurr = () => {
  const [cocurrDetails, setCocurrDetails] = useState({});
  const { usn } = useParams(); // Retrieve usn parameter from the route

  useEffect(() => {
    // Fetch co-curricular details for the specific usn from the server
    axios.get(`http://localhost:8800/fetch-cocurr?usn=${usn}`)
      .then(response => {
        setCocurrDetails(response.data.cocurrDetails[0]);
      })
      .catch(error => {
        console.error(`Error fetching co-curricular details for ${usn}:`, error);
      });
  }, [usn]);

  return (
    <div>
      <h2>Co-curricular Details for {usn}</h2>
      <p>Co-curricular ID: {cocurrDetails.stud_id}</p>
      <p>Date: {cocurrDetails.date}</p>
      <p>Venue: {cocurrDetails.venue}</p>
      <p>Price: {cocurrDetails.price}</p>
      {/* Construct the image URL dynamically */}
      {cocurrDetails.certificate && (
        <img
          src={`/images/cocurr/${cocurrDetails.certificate}`}
          alt="Certificate"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
      {/* Add more attributes as needed */}
    </div>
  );
};

export default ViewCocurr;
