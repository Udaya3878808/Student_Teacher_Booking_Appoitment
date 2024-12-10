import { useContext } from "react";
import Login from "./page/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/Admincontext";
import Navbar from "./compontents/Navbar";
import Sidebar from "./compontents/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./page/Admin/Dashboard";
import AllApointments from "./page/Admin/AllApointments";
import AddTeacher from "./page/Admin/AddTeacher";
import TeacherList from "./page/Admin/TeacherList";
import { TeacherContext } from "./context/TeacherContext";
import TeacherDashboard from "./page/Teacher/TeacherDashboard";
import TeacherAppointments from "./page/Teacher/TeacherAppointments";
import TeacherProfile from "./page/Teacher/TeacherProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(TeacherContext);
  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointment" element={<AllApointments />} />
          <Route path="/add-teacher" element={<AddTeacher />} />
          <Route path="/teacher-list" element={<TeacherList />} />

          {/* Teacher Routes */}
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route
            path="/teacher-appointment"
            element={<TeacherAppointments />}
          />
          <Route path="/teacher-profile" element={<TeacherProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
