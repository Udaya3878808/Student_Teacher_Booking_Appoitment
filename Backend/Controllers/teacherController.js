import teacherModel from "../Models/TeacherModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "./../Models/appointmentModel.js";

const changeAvailablity = async (req, res) => {
  try {
    const { teaId } = req.body;
    const teaData = await teacherModel.findById(teaId);
    await teacherModel.findByIdAndUpdate(teaId, {
      available: !teaData.available,
    });
    res.json({ success: true, message: "Availablity changed" });
  } catch (error) {
    console.log("error in TeacherController", error);
    res.json({ success: false, message: error.message });
  }
};
//  get all teacher data
const teacherList = async (req, res) => {
  try {
    const teachers = await teacherModel
      .find({})
      .select(["-password", "-email"]);
    res.json({ success: true, teachers });
  } catch (error) {
    console.log("error in TeacherController", error);
    res.json({ success: false, message: error.message });
  }
};

// teacher login

const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await teacherModel.findOne({ email });

    if (!teacher) {
      return res.json({ success: false, message: "Inavlid credentials" });
    }

    const ismatch = await bcrypt.compare(password, teacher.password);

    if (ismatch) {
      const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Inavlid credentials" });
    }
  } catch (error) {
    console.log("error in TeacherController", error);
    res.json({ success: false, message: error.message });
  }
};

// all appointment for teacher

const appointmentTeacher = async (req, res) => {
  try {
    const { teaId } = req.body;
    const appointments = await appointmentModel.find({ teaId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log("error in TeacherController appointmentTeacher ", error);
    res.json({ success: false, message: error.message });
  }
};

// mark appointments completed for teacher panel

const appointmentComplete = async (req, res) => {
  try {
    const { teaId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.teaId === teaId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log("error in TeacherController appointmentTeacher ", error);
    res.json({ success: false, message: error.message });
  }
};

// mark appointments camcel for teacher panel

const appointmentCancel = async (req, res) => {
  try {
    const { teaId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.teaId === teaId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment cancelled" });
    } else {
      return res.json({ success: false, message: "cancelled Failed" });
    }
  } catch (error) {
    console.log("error in TeacherController appointmentTeacher ", error);
    res.json({ success: false, message: error.message });
  }
};

// dashboard data for teacher panel

const teacherDashboard = async (req, res) => {
  try {
    const { teaId } = req.body;

    const appointments = await appointmentModel.find({ teaId });

    let users = [];

    appointments.map((item) => {
      if (!users.includes(item.userId)) {
        users.push(item.userId);
      }
    });

    const dashData = {
      appointments: appointments.length,
      users: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log("error in TeacherController appointmentTeacher ", error);
    res.json({ success: false, message: error.message });
  }
};

// get teacher profile for teacher panel

const teacherProfile = async (req, res) => {
  try {
    const { teaId } = req.body;
    const profileData = await teacherModel.findById(teaId).select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log("error in TeacherController appointmentTeacher ", error);
    res.json({ success: false, message: error.message });
  }
};

// update Teacher data from teacher panel

const updateTeacherProfile = async (req, res) => {
  try {
    const { teaId, about, available } = req.body;

    await teacherModel.findByIdAndUpdate(teaId, { about, available });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log("error in TeacherController appointmentTeacher ", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailablity,
  teacherList,
  loginTeacher,
  appointmentTeacher,
  appointmentComplete,
  appointmentCancel,
  teacherDashboard,
  teacherProfile,
  updateTeacherProfile,
};
