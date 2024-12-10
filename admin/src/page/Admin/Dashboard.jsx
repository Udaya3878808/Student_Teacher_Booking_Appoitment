import { useContext } from "react";
import { AdminContext } from "../../context/Admincontext";
import { useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../Data/Data";
const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
    const {slotDateFormat} = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.teacher1} alt="teachers" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.teachers}
              </p>
              <p className="text-gray-500">Teachers</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointment} alt="appointments Icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.user} alt="users" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.users}
              </p>
              <p className="text-gray-500">Users</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 mt-10 rounded-t border">
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img className="rounded-full w-10" src="Teacher Data" alt="" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.teaData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                <div className="w-10 text-lg">
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-400 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <ImCancelCircle
                      onClick={() => cancelAppointment(item._id)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
