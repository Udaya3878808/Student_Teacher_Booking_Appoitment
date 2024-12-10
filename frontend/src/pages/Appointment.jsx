import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../data/Data";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import RelatedTeachers from "../compontents/RelatedTeachers";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { teaId } = useParams();
  const { teacherData, backendUrl, token, getTeacherData } =
    useContext(AppContext);
  const navigate = useNavigate();
  const daysOfWeek = ["SUN", "MON", "TUE", "WEB", "THU", "FRI", "SAT"];
  const [teaInfo, setTeaInfo] = useState(false);
  const [teaSlots, setTeaSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTeaInfo = async () => {
    const teaInfo1 = await teacherData.find((tea) => tea._id === teaId);
    setTeaInfo(teaInfo1);
  };

  const getAvailableSlots = async () => {
    setTeaSlots([]);

    // getting current date

    let today = new Date();
    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting and thime of the date with index

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          teaInfo.slots_booked[slotDate] &&
          teaInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setTeaSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      navigate("/login");
      return;
    }

    try {
      const date = teaSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { teaId, slotDate, slotTime, sendMessage: text },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getTeacherData();
        navigate("/myAppointnent");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchTeaInfo();
  }, [teacherData, teaId]);

  useEffect(() => {
    getAvailableSlots();
  }, [teaInfo]);

  useEffect(() => {
    console.log(teaSlots);
  }, [teaSlots]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    await bookAppointment();
    setIsSubmitting(false);
  };
  return teaInfo ? (
    <form onSubmit={handleSubmit}>
      {/* ...............Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={teaInfo.image}
            alt=""
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-5 py-7 bg-primary mx=2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* Doc teacher */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {teaInfo.name}
            <img className="w-5" src={assets.Verfied_icon} alt="" />
          </p>
          <div>
            <p>Department : {teaInfo.department}</p>
            <p>subject : {teaInfo.subject}</p>
            <button> experience : {teaInfo.experience}</button>
          </div>

          {/* Teacher About */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.Info_Icon} alt="" />
            </p>
            <p className="text-sm text-gray-900 max-w-[700px] mt-1">
              {teaInfo.about}
            </p>
          </div>
        </div>
      </div>
      {/* BOOking Slots */}
      <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-fill overflow-x-scroll mt-4">
          {teaSlots.length &&
            teaSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                }`}
                key={index}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>
        <div className="flex items-center gap-3 w-auto mt-4 overflow-scroll">
          {teaSlots.length &&
            teaSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time == slotTime
                    ? "bg-primary text-white"
                    : "text-gray-400 border border-gray-300"
                }`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>
        <div>
          <div className="flex-l flex flex-col gap-1">
            <p className="mt-4 mb-2">send Message</p>
            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="w-full px-4 pt-2 border rounded"
              placeholder="write about teacher"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
        >
          {isSubmitting ? "Booking..." : "Book an Appointment"}
        </button>
      </div>

      {/* Listing  Related Teacher */}
      <RelatedTeachers teaId={teaId} department={teaInfo.department} />
    </form>
  ) : null;
};

export default Appointment;
