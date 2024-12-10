import { useContext, useState } from "react";
import { AdminContext } from "../../context/Admincontext";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../Data/Data";

const AddTeacher = () => {
  const [teaImg, setTeaImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("Science");
  const [subject, setSubject] = useState("maths");
  const [experience, setExperience] = useState("1 years");
  const [about, setAbout] = useState("");
  const { aToken, backendUrl } = useContext(AdminContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!teaImg) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();
      formData.append("image", teaImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("department", department);
      formData.append("subject", subject);
      formData.append("experience", experience);
      formData.append("about", about);
      // log formdata

      formData.forEach((value, key) => {
        console.log(`${key}:${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-teacher",
        formData,
        {
          headers: { aToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setTeaImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Teacher</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8  text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={assets.teacher}
              alt="upload _area"
            />
          </label>
          <input
            onChange={(e) => setTeaImg(e.target.files[0])}
            type="file"
            id="doc-img"
          />
          <p>
            Upload teacher <br /> Picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-l flex flex-col gap-1">
              <p>Teacher Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex-l flex flex-col gap-1">
              <p>Teacher Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="email"
                required
              />
            </div>
            <div className="flex-l flex flex-col gap-1">
              <p>Teacher password </p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="password"
                required
              />
            </div>

            <div className="w-full lg:flex-l flex flex-col gap-4">
              <div className="flex-l flex flex-col gap-1">
                <p>Department</p>
                <select
                  onChange={(e) => setDepartment(e.target.value)}
                  value={department}
                  className="border rounded px-3 py-2"
                  name=""
                  id=""
                >
                  <option value="Science">Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Health and Medicine">Health Medicine</option>
                  <option value="Business">Business</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>
              <div className="flex-l flex flex-col gap-1">
                <p>Subject</p>
                <select
                  onChange={(e) => setSubject(e.target.value)}
                  value={subject}
                  className="border rounded px-3 py-2"
                  name=""
                  id=""
                >
                  <option value="maths">math</option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Dentistry">Dentistry</option>
                  <option value="Public Health">Public Health</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Finance">Finance</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                </select>
              </div>
              <div className="flex-l flex flex-col gap-1">
                <p>Experience</p>
                <select
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                  className="border rounded px-3 py-2"
                  name=""
                  id=""
                >
                  <option value="1 year">1 year</option>
                  <option value="2 year">2 year</option>
                  <option value=" year">3 year</option>
                  <option value="4 year">4 year</option>
                  <option value="5 year">5 year</option>
                  <option value="6 year">6 year</option>
                  <option value="7 year">7 year</option>
                  <option value="8 year">8 year</option>
                  <option value="9 year">9 year</option>
                  <option value="10 year">10 year</option>
                </select>
              </div>
              <div className="flex-l flex flex-col gap-1">
                <p className="mt-4 mb-2">About Teacher</p>
                <textarea
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                  className="w-full px-4 pt-2 border rounded"
                  placeholder="write about teacher"
                  rows={5}
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
              >
                Add teacher
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTeacher;
