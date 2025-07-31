
import express from "express";
import pool from "./config/db.js";
import authRouter from "./routers/authRouter.js"; 
import adminRouter from "./routers/adminRouter.js";
import "./services/kafkaConsumer.js"
import "./services/emailConsumer.js"
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

import dotenv from "dotenv";
dotenv.config();




const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan("dev"));

const corsOptions = {
  origin: ["http://localhost:5173","http://10.132.125.71:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to CRIME FINDER");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
