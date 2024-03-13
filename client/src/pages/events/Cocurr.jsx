import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
} from "../../components/ui/card";

import { Button } from "../../components/ui/button";


const Cocurr = () => {

  const navigate = useNavigate();

const handleBack=()=>{
  navigate("/user-dashboard")
}

  const [formData, setFormData] = useState({
    usn: '',
    price: '',
    venue: '',
    date: '',
    certificate: null, // Use null to represent the file
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Use a conditional to handle file input separately
    const newValue = type === 'file' ? e.target.files[0] : value;

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file upload
    const formDataForServer = new FormData();
    formDataForServer.append('usn', formData.usn);
    formDataForServer.append('price', formData.price);
    formDataForServer.append('venue', formData.venue);
    formDataForServer.append('date', formData.date);
    formDataForServer.append('certificate', formData.certificate); // This is where the file is appended

    try {
      // Send formDataForServer to your server using axios
      const response = await axios.post('http://localhost:8800/cocurr', formDataForServer, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from the server
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div style={{ overflow: 'hidden' }} className="min-h-screen bg-black flex flex-col top-20 justify-center items-center py-16">
       <Button onClick={handleBack} variant="secondary" className="absolute text-white font-bold border-white border-2 top-10 left-10 p-6  ">
       Back
      </Button>
      <p className="gradient-text text-transparent text-5xl font-bold text-center animate-gradient mt-0 mb-22">CO-CURRICULAR FORM</p>
     
    
     
      <div className="mt-14 flex gap-40">
        <Card className="w-120 h-100 pl-10 pr-10 pb-10 pt-1">
          <CardHeader>
            {/* <CardTitle className="text-white text-center font-bold text-lg mb-4">CoCurr Form</CardTitle> */}
          </CardHeader>

          <form onSubmit={handleSubmit} className="text-white">
            <div className="mb-4">
              <label htmlFor="usn" className="text-white font-bold">USN:</label>
              <input
                type="text"
                id="usn"
                name="usn"
                value={formData.usn}
                onChange={handleChange}
                className="mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="text-white font-bold">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="venue" className="text-white font-bold">Venue:</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="text-white font-bold">Date:</label>
              <input
                type="text"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="certificate" className="text-white font-bold">Certificate:</label>
              <input
                type="file"
                id="certificate"
                name="certificate"
                onChange={handleChange}
                className="mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md w-full"
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full">
              Submit
            </button>
          </form>

          

        </Card>
      </div>
    </div>
  );
};

export default Cocurr;