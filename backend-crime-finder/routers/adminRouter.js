import express from "express"
import { getAllVerificationUsers, insertDetailsIntoDB } from "../controllers/adminController.js";
import { getNotification } from "../controllers/notificationController.js";

const adminRouter = express.Router();


adminRouter.post('/add-details',insertDetailsIntoDB);
adminRouter.get('/get-all-suspects',getAllVerificationUsers);

adminRouter.get('/all-notification',getNotification)




export default adminRouter;