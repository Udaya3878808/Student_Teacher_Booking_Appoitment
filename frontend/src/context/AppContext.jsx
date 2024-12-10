import { createContext, useEffect } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export const AppContext = createContext();

const appContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [teacherData,setTeacherData] = useState([]);
const [token,setToken] = useState(localStorage.getItem("token")? localStorage.getItem("token") : false )
  const [userData,setUserData] = useState(false)


  //get all teacher
  const getTeacherData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/teacher/list");
      if (data.success) {
        setTeacherData(data.teachers);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const {data} = await axios.get(backendUrl + "/api/user/get-profile",{headers:{token}})
      if(data.success){
        setUserData(data.userData)
      }else{
       toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

   const value = {
     teacherData,
     getTeacherData,
     token,
     setToken,
     backendUrl,
     userData,
     setUserData,
     loadUserProfileData
   };


  useEffect(() => {
    getTeacherData();
  }, []);

 useEffect(() => {
  if(token){
    loadUserProfileData()
  }else {
    setUserData(false)
  }
 },[token])
  

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default appContextProvider;
