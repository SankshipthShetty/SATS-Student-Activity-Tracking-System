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
  const handleSubmit = (event, index) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Update activity object with new points
    const activityToUpdate = activityDetails[index];

    // Update activity object with new points
    const updatedActivity = {
      ...activityToUpdate,
      points: parseInt(activityToUpdate.newPoints)
    };

    // Send updated activity data to the backend
    axios
      .post(`http://localhost:8800/update-activity`, updatedActivity)
      .then((response) => {
        console.log("Activity updated successfully:", response.data);
        // Update local state with updated activity data
        setActivityDetails(prevDetails =>
          prevDetails.map((item, i) =>
          i === index ? updatedActivity : item
        )
      );
    })
    .catch((error) => {
      console.error("Error updating activity:", error);
    });
};

  return (
    <div>
      <h2>Activity Details for {usn}</h2>
      {activityDetails && activityDetails.length > 0 ? (
        activityDetails.map((activity,index) => (
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
          <form onSubmit={(event) => handleSubmit(event, index)}>
              <label htmlFor={`points-${index}`}>Points:</label>
              <input
                type="number"
                id={`points-${index}`}
                value={activity.newPoints}
                onChange={(e) => {
                  const newPointsValue = e.target.value;
                  setActivityDetails(prevDetails =>
                    prevDetails.map((item, i) =>
                      i === index ? { ...item, newPoints: newPointsValue } : item
                    )
                  );
                }}
              />
              <button type="submit">Submit</button>
            </form>
            
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
