import  { useContext, useState } from "react";
import { AdminContext } from "../context/Admincontext";
import axios from "axios";
import { toast } from "react-toastify";
import { TeacherContext } from "../context/TeacherContext";


const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const {setDToken} = useContext(TeacherContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(
          backendUrl + "/api/admin/login",
          {
            email,
            password,
          }
        );
        if (data.success) {
          localStorage.setItem("aToken",data.token)
         setAToken(data.token);
        }else{
          toast.error(data.message)
        }
      } else {
       const {data} = await axios.post(backendUrl+"/api/teacher/login",{email,password})
       if (data.success) {
         localStorage.setItem("dToken", data.token);
         setDToken(data.token);
         console.log(data.token);
         
       } else {
         toast.error(data.message);
       }
      }
    } catch (error) {
      toast.error(error)
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:win-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
            value={email}
          />
        </div>
        <div className="w-full">
          <p>password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            value={password}
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Teacher Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("teacher")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
