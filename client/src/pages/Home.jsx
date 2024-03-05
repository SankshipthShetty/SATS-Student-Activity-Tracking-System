import React from 'react';
import { Link } from 'react-router-dom';
import AdminLogin from './admin/AdminLogin';
import StudentLogin from './student/StudentLogin';

function Home() {
  return (
    <div>
      

      
        <AdminLogin/>

        <StudentLogin/>
      
       
      <div>
        <Link to="/admin-register">
          <button>Admin Register</button>
        </Link>
        <Link to="/student-register">
          <button>Student Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
