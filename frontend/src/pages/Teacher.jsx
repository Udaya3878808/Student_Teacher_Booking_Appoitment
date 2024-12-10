import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Teacher = () => {
  const { department } = useParams();
  const { teacherData, teachers } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter,setShowFilter ] = useState(false)
  const navigate = useNavigate();

  const applyFilter = () => {
    if (department) {
      setFilterDoc(teacherData.filter((doc) => doc.department === department));
    } else {
      setFilterDoc(teacherData);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [department, teacherData]);

  return (
    <div>
      <p className="text-gray-600">Browse through a doctors department</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              department === "Science"
                ? navigate("/teacher")
                : navigate("/teacher/Science")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transtion-all cursor-pointer ${
              department === "Science" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Science
          </p>
          <p
            onClick={() =>
              department === "Engineering"
                ? navigate("/teacher")
                : navigate("/teacher/Engineering")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transtion-all cursor-pointer ${
              department === "Engineering" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Engineering
          </p>
          <p
            onClick={() =>
              department === "Health and Medicine"
                ? navigate("/teacher")
                : navigate("/teacher/Health and Medicine")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transtion-all cursor-pointer ${
              department === "Health and Medicine"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Health and Medicine
          </p>
          <p
            onClick={() =>
              department === "Business"
                ? navigate("/teacher")
                : navigate("/teacher/Business")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transtion-all cursor-pointer ${
              department === "Business" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Business
          </p>
          <p
            onClick={() =>
              department === "Computer Science"
                ? navigate("/teacher")
                : navigate("/teacher/Computer Science")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transtion-all cursor-pointer ${
              department === "Computer Science"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Computer Science
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
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
      </div>
    </div>
  );
};

export default Teacher;
