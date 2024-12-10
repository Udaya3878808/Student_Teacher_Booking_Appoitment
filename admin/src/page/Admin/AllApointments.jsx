import { useContext } from "react";
import { AdminContext } from "../../context/Admincontext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { ImCancelCircle } from "react-icons/im";

const AllApointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_2fr_2fr_2fr_2fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Name</p>
          <p>Date & Time</p>
          <p>Teacher</p>
          <p>sendMessage</p>
          <p>Actions</p>
        </div>
        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_2fr_2fr_2fr_2fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100"
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
            <div className="flex items-center gap-2">
              <img
                className="w-14 rounded-full"
                src={item.teaData.image}
                alt=""
              />{" "}
              <p>{item.teaData.name}</p>
            </div>
            <p>{item.sendMessage}</p>
            <div className="w-10 text-lg">
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-400 text-xs font-medium">Completed</p>
              ) : (
                <ImCancelCircle onClick={() => cancelAppointment(item._id)} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApointments;
