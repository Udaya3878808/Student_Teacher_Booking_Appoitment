import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Teacher from "./pages/Teacher";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/contact";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Appointment from "./pages/Appointment";
import Navbar from "./compontents/Navbar";
import Footer from "./compontents/Footer";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="mx-4 sm:max-[10%]">
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/teacher/:department" element={<Teacher />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="myAppointnent" element={<MyAppointment/>}/>
        <Route path="/Appointment/:teaId" element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
