// import axios from 'axios';
// import React from 'react'
// import  { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// const StudentRegister = () => {
//   const [formData, setFormData] = useState({
//     usn: '',
//     password: '',
//     fname: '',
//     lname: '',
//     branch: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { usn, password, fname, lname, branch } = formData;
//       await axios.post('http://localhost:8800/student-register', {
//         usn,
//         password,
//         fname,
//         lname,
//         branch,
//       });
//       navigate('/');
//     } catch (err) {
//       // Handle the error here
//       console.log(err);
//     }

//     console.log(formData);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="usn">USN:</label>
//           <input
//             type="text"
//             id="usn"
//             name="usn"
//             value={formData.usn}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label htmlFor="fname">First Name:</label>
//           <input
//             type="text"
//             id="fname"
//             name="fname"
//             value={formData.fname}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label htmlFor="lname">Last Name:</label>
//           <input
//             type="text"
//             id="lname"
//             name="lname"
//             value={formData.lname}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label htmlFor="branch">Branch:</label>
//           <input
//             type="text"
//             id="branch"
//             name="branch"
//             value={formData.branch}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default StudentRegister;


import axios from 'axios';
import React from 'react'
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
const StudentRegister = () => {
  const [formData, setFormData] = useState({
    usn: '',
    password: '',
    fname: '',
    lname: '',
    branch: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { usn, password, fname, lname, branch } = formData;
      await axios.post('http://localhost:8800/student-register', {
        usn,
        password,
        fname,
        lname,
        branch,
      });
      navigate('/');
    } catch (err) {
      // Handle the error here
      console.log(err);
    }

    console.log(formData);
  };

  return (
    <div style={{ overflow: 'hidden' }} className="min-h-screen bg-black flex flex-col top-20 justify-center items-center py-16">
    <p className="gradient-text text-transparent text-5xl font-bold text-center animate-gradient mt-0 mb-8">REGISTER AS STUDENT</p>

    <div className="mt-8 flex gap-40">
      <Card className="w-96 h-98">
        <CardHeader>
          <CardTitle className="text-white text-center font-bold text-lg">STUDENT REGISTER</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="usn" className="text-white font-bold">USN</label>
            <input
              type="text"
              id="usn"
              name="usn"
              value={formData.usn}
              onChange={handleChange}
              placeholder='Enter USN'
              className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-white font-bold">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter Password'
              className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fname" className="text-white font-bold">First Name</label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder='Enter First Name'
              className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lname" className="text-white font-bold">Last Name</label>
            <input
              type="text"
              id="lname"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              placeholder='Enter Last Name'
              className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="branch" className="text-white font-bold">Branch</label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder='Enter Branch'
              className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
            />
          </div>

          <Button type="submit" className="ml-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4">Submit</Button>
        </form>
      </Card>
    </div>
  </div>
  );
};

export default StudentRegister;
