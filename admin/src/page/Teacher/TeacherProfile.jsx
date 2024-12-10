import React, { useContext, useEffect, useState } from 'react'
import { TeacherContext } from '../../context/TeacherContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const TeacherProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(TeacherContext);
   const [isEdit,setIsEdit] = useState(false)

   const updateProfile = async () => {
    try {
      const updateData = {
        available:profileData.available
      }
      const {data} =await axios.post(backendUrl + "/api/teacher/update-profile",updateData,{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
      
    }
   }
    
    useEffect(() => {
      if(dToken){
      getProfileData()
      }
    },[dToken])
  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>
          <dir className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* teac Info :name,department, experience */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.department} - {profileData.subject}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>
            {/* teacher About */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">Available</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </dir>
        </div>
      </div>
    )
  );
}

export default TeacherProfile