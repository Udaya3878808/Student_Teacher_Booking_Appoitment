import  { useContext } from 'react'
import { AdminContext } from '../context/Admincontext';
import { NavLink } from 'react-router-dom';
import { TeacherContext } from '../context/TeacherContext';
import { assets } from '../Data/Data';

const Sidebar = () => {
     const { aToken } = useContext(AdminContext);
     const {dToken} = useContext(TeacherContext)
  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[mF2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <img className="w-8" src={assets.dashboard} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[mF2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/all-appointment"}
          >
            <img className="w-8" src={assets.appointment} alt="Appointments" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[mF2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/add-teacher"}
          >
            <img className="w-8" src={assets.teacher1} alt="Add Teacher" />
            <p className="hidden md:block">Add Teacher</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[mF2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/teacher-list"}
          >
            <img className="w-8" src={assets.teacher} alt="Teacher list" />
            <p className="hidden md:block">Teacher list</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[mF2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/teacher-dashboard"}
          >
            <img className="w-8" src={assets.dashboard} alt="Dashboard" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[mF2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/teacher-appointment"}
          >
            <img className="w-8" src={assets.appointment} alt="Appointments" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[mF2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/teacher-profile"}
          >
            <img className="w-8" src={assets.teacher1} alt="Teacher list" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
}

export default Sidebar

