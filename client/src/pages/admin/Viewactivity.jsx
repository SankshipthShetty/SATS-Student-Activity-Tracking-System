import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
} from "../../components/ui/card";


const Viewactivity = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [activityDetails, setActivityDetails] = useState([]);
  const { usn } = useParams(); // Retrieve usn parameter from the route

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    // Set the href attribute to the URL of the selected image
    downloadLink.href = selectedImage;
    // Set the download attribute to specify the filename
    downloadLink.download = 'image.jpg'; // You can change 'image.jpg' to whatever filename you want
    
    // Simulate a click on the anchor element to trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    // Clean up by removing the anchor element
    document.body.removeChild(downloadLink);
  }
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
    <div style={{ overflow: 'hidden' }} className="min-h-screen bg-black flex flex-col top-20 justify-center items-center py-16">
    <p className=" absolute gradient-text text-transparent text-5xl font-bold text-center animate-gradient top-20 ">ACTIVITY DETAILS</p>
    <h2 className="absolute text-white font-bold text-3xl top-36 ">USN: {usn}</h2>
    <h2 className="absolute text-white font-bold text-3xl top-48 ">Total Points: 10/100</h2>
    {activityDetails && activityDetails.length > 0 ? (
      activityDetails.map((activity) => (
        <div className="w-full flex justify-center mb-4">
          <div className=" rounded-lg p-4 flex w-5/6  border-2 border-white">
            <div className="w-3/4">
              {/* <p className="text-white font-bold">Activity ID: {activity.activity_id}</p> */}
              <p className="text-white font-bold">Date: {activity.date}</p>
              <p className="text-white font-bold">Venue: {activity.venue}</p>
              <p className="text-white font-bold">Description: {activity.doc}</p>
              <p className="text-white font-bold">Points: {activity.points}</p>
              
              {/* Add more attributes as needed */}
            </div>
            <div className="w-1/4 flex justify-center items-center text-white font-bold">
           <p className="text-white font-bold mr-5 mb-28">Proof:</p>
            {activity.proof && (
  <div className="cursor-pointer" onClick={() => handleImageClick(`/images/activity/${activity.proof}`)}>
    <img
      src={`/images/activity/${activity.proof}`}
      alt="Proof"
      className="h-auto max-w-full rounded-lg"
    />
  </div>
)}

{modalVisible && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
    <div className="bg-transparent rounded-lg p-4">
      <div className="flex justify-end">
        <button className="text-white font-light text-2xl" onClick={closeModal}>X</button>
      </div>
      <img
        src={selectedImage}
        alt="Proof"
        className=" h-auto max-w-lg rounded-lg"
      />
      <div className="flex justify-center mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDownload} >Download</button>
      </div>
    </div>
  </div>
)}
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No activity details found for {usn}</p>
    )}
  </div>
  
  );
};

export default Viewactivity;
