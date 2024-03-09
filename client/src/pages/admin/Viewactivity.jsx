import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";



const Viewactivity = () => {
  const [activityDetails, setActivityDetails] = useState([]);
  const { usn } = useParams(); // Retrieve usn parameter from the route

  useEffect(() => {
    // Fetch all activity details for the specific usn from the server
    axios
      .get(`http://localhost:8800/fetch-activity?usn=${usn}`)
      .then((response) => {
        const data = response.data.activityDetails;
        if (data && data.length > 0) {
          setActivityDetails(data);
        }
      })
      .catch((error) => {
        console.error(`Error fetching activity details for ${usn}:`, error);
      });
  }, [usn]);

  return (
    <div>
      <h2>Activity Details for {usn}</h2>
      {activityDetails && activityDetails.length > 0 ? (
        activityDetails.map((activity) => (
          <div key={activity.activity_id}>
            <p>Activity ID: {activity.activity_id}</p>
            <p>Date: {activity.date}</p>
            <p>Duration: {activity.venue}</p>
            {activity.proof && (
              <img
                src={`/images/activity/${activity.proof}`}
                alt="Proof"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )}
            {/* Add more attributes as needed */}
          </div>
        ))
      ) : (
        <p>No activity details found for {usn}</p>
      )}
    </div>
  );
};

export default Viewactivity;
