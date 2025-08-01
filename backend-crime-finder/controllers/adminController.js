import pool from "../config/db.js";
import sendToKafka from "../services/kafkaProducer.js";
import APIError from "../utils/apiError.js";
import APIResponse from "../utils/apiResponse.js";

const insertDetailsIntoDB = async (req, res, next) => {
  const { name, description } = req.body;
  
  try {
    if (!name) {
      throw new APIError("Name is required", 400);
    }

    const result = await pool.query(
      "INSERT INTO verificationusers(name, description) VALUES($1, $2) RETURNING id, name, description",
      [name, description]
    );

        const insertedData = result.rows[0];

     await sendToKafka("person-data", insertedData);


    return res
      .status(200)
      .json(APIResponse.success("Details Added Successfully", result.rows[0]));
  } catch (error) {
    next(error);
  }
};


const getAllVerificationUsers = async (req,res,next) =>{
    try {
  
    const result = await pool.query(
    "SELECT * FROM verificationusers"
    );

    return res
      .status(200)
      .json(APIResponse.success("Details Added Successfully", result.rows));
  } catch (error) {
    next(error);
  }
}

export { insertDetailsIntoDB,getAllVerificationUsers };
