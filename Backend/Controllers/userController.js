import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "./../Models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import teacherModel from "./../Models/TeacherModel.js";
import appointmentModel from "../Models/appointmentModel.js";

// register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }
    if (password.lemgth < 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log("error in UserController", error);
    res.json({ success: false, message: error.message });
  }
};

// user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invaild credentials" });
    }
  } catch (error) {
    console.log("error in UserController", error);
    res.json({ success: false, message: error.message });
  }
};

// user profile data

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log("error in UserController", error);
    res.json({ success: false, message: error.message });
  }
};

//

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address,
      dob,
      gender,
    });

    if (imageFile) {
      // update image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log("error in UserController", error);
    res.json({ success: false, message: error.message });
  }
};

// appointment

const bookAppointment = async (req, res) => {
  try {
    const { userId, teaId, slotDate, slotTime, sendMessage } = req.body;

    const teaData = await teacherModel.findById(teaId).select("-password");

    if (!teaData.available) {
      return res.json({ success: false, message: "teacher is not available" });
    }

    let slots_booked = teaData.slots_booked;

    // checking for slot avalablty

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");

    delete teaData.slots_booked;

    const appointmentData = {
      userId,
      teaId,
      userData,
      teaData,
      slotDate,
      slotTime,
      sendMessage: sendMessage || "No message provided",
      date: Date.now(),
    };
    const newAppointment = new appointmentModel(appointmentData);

    await newAppointment.save();

    // save new slots dat inteaId
    await teacherModel.findByIdAndUpdate(teaId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log("error in UserController user", error);
    res.json({ success: false, message: error.message });
  }
};

// get user appointment 

const listAppointment = async(req,res) => {
  try {
    const {userId}= req.body
    const appointments= await appointmentModel.find({userId})
    res.json({success:true,appointments})
  } catch (error) {
    console.log("error in UserController user", error);
    res.json({ success: false, message: error.message });
  }
}

// cancel appointment

const cancelAppointment = async(req,res) => {
  try {
    const {userId ,appointmentId} = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)
    
    // verify appointment user

    if(appointmentData.userId !== userId){
      return res.json ({success:false,message:"Unauthorized action"})
    }

    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

    // releasing teacher slot

     const {teaId ,slotDate,slotTime} = appointmentData
     const teacherData = await teacherModel.findById(teaId)
     let slots_booked = teacherData.slots_booked

     slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

     await teacherModel.findByIdAndUpdate(teaId,{slots_booked})
     
     res.json({success:true,message:"Appointment Cancelled"})

  } catch (error) {
    console.log("error in UserController user", error);
    res.json({ success: false, message: error.message });
  }
}
 
export { registerUser, loginUser, getProfile, updateProfile, bookAppointment , listAppointment,cancelAppointment};
