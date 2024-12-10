// adding teacher
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import teacherModel from "./../Models/TeacherModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../Models/appointmentModel.js";
import userModel from "./../Models/userModel.js";

const addTeacher = async (req, res) => {
  try {
    const { name, email, password, department, subject, experience, about } =
      req.body;
    const imageFile = req.file;

    // checking for all data to add teacher

    if (
      !name ||
      !email ||
      !password ||
      !department ||
      !subject ||
      !experience ||
      !about
    ) {
      return res.json({ success: false, message: "missing Deatils" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a vaild email",
      });
    }

    // validaing strong password

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "plases eneter a strong password",
      });
    }

    // hasing teacher password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to clouding

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const teacherData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      department,
      subject,
      experience,
      about,
      date: Date.now(),
    };

    const newTeacher = new teacherModel(teacherData);
    await newTeacher.save();
    res.json({ success: true, message: "teacher added" });
  } catch (error) {
    console.log("error in AdminController", error);
    res.json({ success: false, message: error.message });
  }
};

// admin login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invaild details" });
    }
  } catch (error) {
    console.log("error in AdminController", error);
    res.json({ success: false, message: error.message });
  }
};

// add all teacher

const allTeachers = async (req, res) => {
  try {
    const teachers = await teacherModel.find({}).select("-password");
    res.json({ success: true, teachers });
  } catch (error) {
    console.log("error in AdminController", error);
    res.json({ success: false, message: error.message });
  }
};
//all appointment

const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log("error in AdminController", error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // verify appointment user

    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing teacher slot

    const { teaId, slotDate, slotTime } = appointmentData;
    const teacherData = await teacherModel.findById(teaId);
    let slots_booked = teacherData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await teacherModel.findByIdAndUpdate(teaId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log("error in UserController user", error);
    res.json({ success: false, message: error.message });
  }
};

// get dashboard data for admin panel

const adminDashboard = async (req, res) => {
  try {
    const teachers = await teacherModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      teachers: teachers.length,
      appointments: appointments.length,
      users: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log("error in UserController user", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addTeacher,
  loginAdmin,
  allTeachers,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
