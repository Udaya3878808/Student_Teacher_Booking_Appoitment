import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { assets } from "../data/Data";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
 const {token , setToken,userData} = useContext(AppContext)

 const logout = () => {
  setToken (false)
  localStorage.removeItem("token")
 }
  
  const Navigate = useNavigate();
  return (
    <div className="flex items-center justify-between text-sm py-5 mb-5 border-b border-b-gray-900">
      <h1 onClick={() => Navigate("/")} className="w-44 cursor-pointer">
        <div className="w-64">
          <img src={assets.icon} alt="" />
        </div>
      </h1>
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/teacher">
          <li className="py-1">All Teachers</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-11 rounded-full" src={userData.image} alt="" />
            <FaAngleDown />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-200 rounded flex flex-col gap-2 p-2">
                <p
                  onClick={() => Navigate("/myProfile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => Navigate("/myAppointnent")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Layout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => Navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />
        {/* mobile Menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <p className="w-36">Student_Teacher Booking Appointment</p>
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/teacher">
              <p className="px-4 py-2 rounded inline-block">All teacher</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">About</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">Contact</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
