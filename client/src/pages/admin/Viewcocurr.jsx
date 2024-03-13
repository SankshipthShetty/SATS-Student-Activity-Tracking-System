import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewCocurr = () => {
  const [cocurrDetails, setCocurrDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
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

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); 
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDownload = () => {
    // Handle download functionality here
  };

return (
    <div style={{ overflow: 'hidden' }} className="min-h-screen bg-black flex flex-col top-20 justify-center items-center py-16">
      <p className=" absolute gradient-text text-transparent text-5xl font-bold text-center animate-gradient top-20 ">CO-CURRICULAR DETAILS</p>
      <h2 className="absolute text-white font-bold text-3xl top-40 mb-4">USN: {usn}</h2>
      {cocurrDetails && cocurrDetails.length > 0 ? (
        cocurrDetails.map((cocurr) => (
          <div className="w-full flex justify-center mb-8" key={cocurr.cocurr_id}>
            <div className="rounded-lg p-4 flex w-5/6 border-2 border-white">
              <div className="w-3/4">
                <p className="text-white font-bold">Date: {cocurr.date}</p>
                <p className="text-white font-bold">Venue: {cocurr.venue}</p>
                <p className="text-white font-bold">Price: {cocurr.price}</p>
              </div>
              <div className="w-1/4 flex justify-center items-center text-white font-bold">
                <p className="text-white font-bold mr-5">Certificate:</p>
                {cocurr.certificate && (
                  <div className="cursor-pointer" onClick={() => handleImageClick(`/images/cocurr/${cocurr.certificate}`)}>
                    <img
                      src={`/images/cocurr/${cocurr.certificate}`}
                      alt="Certificate"
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
                        alt="Certificate"
                        className="h-auto max-w-lg rounded-lg"
                      />
                      <div className="flex justify-center mt-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDownload}>Download</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white font-bold text-2xl">No Co-curricular details found for {usn}</p>
      )}
    </div>
  );
};

export default ViewCocurr;
