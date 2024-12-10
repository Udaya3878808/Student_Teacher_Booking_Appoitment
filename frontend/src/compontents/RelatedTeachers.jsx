import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedTeachers = ({ department, teaId }) => {
  const { teacherData } = useContext(AppContext);
  const navigate = useNavigate()
  const [relTea, setRelTea] = useState([]);

  useEffect(() => {
    if (teacherData.length > 0 && department) {
      const teachers = teacherData.filter(
        (tea) => tea.department === department && tea._id !== teaId
      );
      setRelTea(teachers);
    }
  }, [teacherData, department, teaId]);
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Teacher to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted Teachers
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relTea.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="bg-blue-50" src={item.image} alt="" />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? "text-green-500" : "text-gray-500"
                } `}
              >
                <p
                  className={`w-2 h-2 ${
                    item.available ? "bg-green-500" : "bg-gray-500"
                  }  rounded-full`}
                ></p>{" "}
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-center text-gray-900 text-lg font-medium">
                Name : {item.name}
              </p>
              <p className="text-center text-gray-900 text-lg font-normal">
                Department : {item.department}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/teacher");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );

};

export default RelatedTeachers;
