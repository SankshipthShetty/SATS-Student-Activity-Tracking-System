import axios from 'axios';
import React from 'react'
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
 import { Card, CardHeader, CardTitle } from "../../components/ui/card";
const AdminRegister = () => {
  const [formData, setFormData] = useState({
    branch: '',
    password: '',
    fname: '',
    lname: '',
    faculty_no: '',
  });

const navigate=useNavigate();

   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { branch, password, fname, lname, faculty_no } = formData;
      await axios.post('http://localhost:8800/admin-register', {
        branch,
        password,
        fname,
        lname,
        faculty_no,
      
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
      <p className="gradient-text text-transparent text-5xl font-bold text-center animate-gradient mt-0 mb-8">REGISTER AS ADMIN</p>

      <div className="mt-8 flex gap-40">
        <Card className="w-96 h-98">
          <CardHeader>
            <CardTitle className="text-white text-center font-bold text-lg">ADMIN REGISTER</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <label htmlFor="branch" className="text-white font-bold">Branch</label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder='Enter branch'
                className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="text-white  font-bold">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter password'
                className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="fname" className="text-white  font-bold">First Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder='Enter first name'
                className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lname" className="text-white  font-bold">Last Name</label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                placeholder='Enter last name'
                className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="faculty_no" className="text-white  font-bold">Faculty Number</label>
              <input
                type="text"
                id="faculty_no"
                name="faculty_no"
                value={formData.faculty_no}
                placeholder='Enter faculty number'
                onChange={handleChange}
                className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
              />
            </div>

            <Button type="submit" className="ml-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4">Submit</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default AdminRegister;



// import axios from 'axios';
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from "../../components/ui/button";
// import { Card, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";

// const AdminRegister = () => {
//   const [formData, setFormData] = useState({
//     branch: '',
//     password: '',
//     fname: '',
//     lname: '',
//     faculty_no: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { branch, password, fname, lname, faculty_no } = formData;
//       await axios.post('http://localhost:8800/admin-register', {
//         branch,
//         password,
//         fname,
//         lname,
//         faculty_no,
//       });
//       navigate('/');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div style={{ overflow: 'hidden' }} className="min-h-screen bg-black flex flex-col top-20 justify-center items-center py-16">
//       <p className="gradient-text text-transparent text-5xl font-bold text-center animate-gradient mt-0 mb-8">REGISTER AS ADMIN</p>

//       <div className="mt-8 flex gap-40">
//         <Card className="w-96 h-98">
//           <CardHeader>
//             <CardTitle className="text-white text-center font-bold text-lg">ADMIN REGISTER</CardTitle>
//           </CardHeader>
//           <form onSubmit={handleSubmit} className="p-4">
//             <div className="mb-4">
//               <label htmlFor="branch" className="text-white">Branch:</label>
//               <input
//                 type="text"
//                 id="branch"
//                 name="branch"
//                 value={formData.branch}
//                 onChange={handleChange}
//                 className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="password" className="text-white">Password:</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="fname" className="text-white">First Name:</label>
//               <input
//                 type="text"
//                 id="fname"
//                 name="fname"
//                 value={formData.fname}
//                 onChange={handleChange}
//                 className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="lname" className="text-white">Last Name:</label>
//               <input
//                 type="text"
//                 id="lname"
//                 name="lname"
//                 value={formData.lname}
//                 onChange={handleChange}
//                 className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="faculty_no" className="text-white">Faculty Number:</label>
//               <input
//                 type="text"
//                 id="faculty_no"
//                 name="faculty_no"
//                 value={formData.faculty_no}
//                 onChange={handleChange}
//                 className="mt-2 appearance-none block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 leading-tight text-white focus:outline-none focus:bg-gray-900 focus:border-gray-500"
//               />
//             </div>

//             <Button type="submit" className="ml-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4">Submit</Button>
//           </form>
//           <CardFooter className="flex justify-center items-center mt-4">
//             <p className="text-white">Already have an account? <Link to="/" className="text-blue-500 hover:text-blue-700">Login</Link></p>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// }

// export default AdminRegister;
