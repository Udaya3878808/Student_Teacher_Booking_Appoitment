import express from "express"
import cors from "cors"
import connectToMongoDB from "./config/mongodb.js"
import dotenv from "dotenv"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from './routes/adminRoute.js';
import teacherRouter from "./routes/teacherRoute.js"
import userRouter from "./routes/userRoute.js"

//configure env
dotenv.config()

const app = express()
const port = process.env.PORT || 4000
connectToMongoDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// app.endpint
app.use("/api/admin",adminRouter)
app.use("/api/teacher",teacherRouter)
app.use("/api/user", userRouter);

app.get("/",(req,res) => {
    res.send("api working nice")
})

app.listen(port,() => console.log("server is working",port))
