import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AdminRegister from './pages/admin/AdminRegister';
import StudentRegister from './pages/student/StudentRegister';
import AdminHome from "./pages/dashboard/AdminHome.jsx";
import UserHome from "./pages/dashboard/UserHome.jsx";
import Cocurr from "./pages/events/Cocurr.jsx";
import Activity from "./pages/events/Activity.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/student-register" element={<StudentRegister />} />
          <Route path="/dashboard" element={<AdminHome/>} />
          <Route path="/user-dashboard" element={<UserHome/>} />
          <Route path="/cocurrecular" element={<Cocurr/>} />
          <Route path="/activity" element={<Activity/>} />
          {/* <Route path="" element={<h1>Not Found</h1>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
