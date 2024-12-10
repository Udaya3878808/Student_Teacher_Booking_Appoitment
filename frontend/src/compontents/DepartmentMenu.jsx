import { Link } from "react-router-dom";
import { departmentData } from "../data/Data";
const DepartmentMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="department"
    >
      <h1 className="text-3xl font-medium">Find By Department</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of tristed Teachers,schedule
        your appointment.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-auto overflow-scroll ">
        {departmentData.map((item, index) => (
          <Link onClick={() => scrollTo(0,0)} className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500" key={index} to={`/teacher/${item.department}`}>
            <img className="w-20 rounded-full sm:w-24 mb-2" src={item.image1} alt="" />
            <p className="font-medium">{item.department}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DepartmentMenu;
