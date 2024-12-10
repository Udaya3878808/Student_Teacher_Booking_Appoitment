import express from "express";
import { addTeacher,allTeachers,loginAdmin,appointmentsAdmin, appointmentCancel, adminDashboard } from "../Controllers/adminController.js";
import upload from "../Middlewares/multer.js";
import authAdmin from "../Middlewares/authadmin.js";
import { changeAvailablity } from "../Controllers/teacherController.js";

const adminRouter = express.Router();

adminRouter.post("/add-teacher",authAdmin, upload.single("image"), addTeacher);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-teachers",authAdmin, allTeachers);
adminRouter.post("/change-availability", authAdmin,changeAvailablity);
adminRouter.get("/appointments",authAdmin,appointmentsAdmin)
adminRouter.post("/cancel-appointment",authAdmin,appointmentCancel)
adminRouter.get("/dashboard",authAdmin,adminDashboard)
export default adminRouter;
