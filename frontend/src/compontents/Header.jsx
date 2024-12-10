import { FaArrowRight } from "react-icons/fa";
import { assets } from "../data/Data";
const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* left side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> with Our Teachers
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-5m font-light">
          <img className="w-28" src={assets.group} alt="group image" />
          <p>
            Simply browse through our extensive list of tristed Teachers,
            <br className="hidden sm:block" />
            schedule your appointment.
          </p>
        </div>
        <a
          href="#department"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book Appointment <FaArrowRight className="w-3" />
        </a>
      </div>

      {/* right side */}
      <div className="md:w-96 relative">
        <img
          className="w-96 md:absolute justify-end bottom-3 h-auto pl-4 rounded-full  "
          src={assets.header}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
