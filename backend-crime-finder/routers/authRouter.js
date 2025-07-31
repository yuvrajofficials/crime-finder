import express from "express"
import { loginController, registerController } from "../controllers/authController.js";
import { refreshTokenController } from "../controllers/refreshController.js";
import scrapePersonDetailsByName from "../utils/webScrapper.js";
import APIResponse from "../utils/apiResponse.js";
const authRouter = express.Router();


authRouter.post('/login',loginController);
authRouter.post('/register',registerController);
authRouter.post('/refresh',refreshTokenController);

authRouter.post('/scrape', async (req, res) => {
  try {
    const URL = 'http://localhost:5174';
    const NAME = 'Kashish Swaminathan';

    const result = await scrapePersonDetailsByName(URL, NAME);

    res.status(200).json(APIResponse.success("Data Scraping Successful", { result }));


  } catch (error) {
    console.error("Scraping error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});




export default authRouter;