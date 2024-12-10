import { useContext } from "react";
import { TeacherContext } from "./../../context/TeacherContext";
import { useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import { FaRegCheckCircle } from "react-icons/fa";

const TeacherAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    slotDateFormat,
    completeAppointment,
    cancelAppointment,
  } = useContext(TeacherContext);
  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[1fr_2fr_2fr_3fr_2fr] gap-1 py-3 px-6 border-b ">
          <p>#</p>
          <p>Name</p>
          <p>Date & Time</p>
          <p>sendMessage</p>
          <p>Actions</p>
        </div>
        {appointments.reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[1fr_2fr_2fr_3fr_2fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-14 rounded-full"
                src={item.userData.image}
                alt=""
              />{" "}
              <p>{item.userData.name}</p>
            </div>
            <p>
              {slotDateFormat(item.slotDate)},{item.slotTime}
            </p>
            <p>{item.sendMessage}</p>
            {item.cancelled ? (
              <p className="text-red-500 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex">
                <ImCancelCircle
                  onClick={() => cancelAppointment(item._id)}
                  className="w-14 cursor-pointer text-lg"
                />
                <FaRegCheckCircle
                  onClick={() => completeAppointment(item._id)}
                  className="w-14 cursor-pointer text-lg"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherAppointments;
