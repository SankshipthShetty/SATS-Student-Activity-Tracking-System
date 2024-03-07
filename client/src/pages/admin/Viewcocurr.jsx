import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewCocurr = () => {
  const [cocurrDetails, setCocurrDetails] = useState([]);
  const { usn } = useParams(); // Retrieve usn parameter from the route

  useEffect(() => {
    // Fetch co-curricular details for the specific usn from the server
    axios
      .get(`http://localhost:8800/fetch-cocurr?usn=${usn}`)
      .then((response) => {
        const data = response.data.cocurrDetails;
        if (data && data.length > 0) {
          setCocurrDetails(data);
        }
      })
      .catch((error) => {
        console.error(`Error fetching co-curricular details for ${usn}:`, error);
      });
  }, [usn]);

  return (
    <div>
      <h2>Co-curricular Details for {usn}</h2>
      {cocurrDetails.length > 0 ? (
        cocurrDetails.map((cocurr) => (
          <div key={cocurr.cocurr_id}>
            <p>Co-curricular ID: {cocurr.stud_id}</p>
            <p>Date: {cocurr.date}</p>
            <p>Venue: {cocurr.venue}</p>
            <p>Price: {cocurr.price}</p>
            {/* Construct the image URL dynamically */}
            {cocurr.certificate && (
              <img
                src={`/images/cocurr/${cocurr.certificate}`}
                alt="Certificate"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            )}
            {/* Add more attributes as needed */}
          </div>
        ))
      ) : (
        <p>No co-curricular details found for {usn}</p>
      )}
    </div>
  );
};

export default ViewCocurr;
