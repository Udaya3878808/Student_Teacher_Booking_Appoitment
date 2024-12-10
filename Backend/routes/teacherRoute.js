import express from "express";
import {
  teacherList,
  loginTeacher,
  appointmentTeacher,
  appointmentComplete,
  appointmentCancel,
  teacherDashboard,
  teacherProfile,
  updateTeacherProfile,
} from "../Controllers/teacherController.js";
import authTeacher from "./../Middlewares/authTeacher.js";

const teacherRouter = express.Router();

teacherRouter.get("/list", teacherList);
teacherRouter.post("/login", loginTeacher);
teacherRouter.get("/appointments", authTeacher, appointmentTeacher);
teacherRouter.post("/complete-appointment",authTeacher,appointmentComplete)
teacherRouter.post("/cancel-appointment",authTeacher,appointmentCancel)
teacherRouter.get("/dashboard",authTeacher,teacherDashboard)
teacherRouter.get("/profile",authTeacher,teacherProfile)
teacherRouter.post("/update-profile",authTeacher,updateTeacherProfile)

export default teacherRouter;
