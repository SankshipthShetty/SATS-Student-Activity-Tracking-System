import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AdminRegister from './pages/admin/AdminRegister';
import StudentRegister from './pages/student/StudentRegister';
import AdminHome from "./pages/dashboard/AdminHome.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/student-register" element={<StudentRegister />} />
          <Route path="/dashboard" element={<AdminHome/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
