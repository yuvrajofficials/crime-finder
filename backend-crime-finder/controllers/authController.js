import pool from "../config/db.js";
import APIError from "../utils/apiError.js";
import APIResponse from "../utils/apiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { generateToken } from "../utils/generateToken.js";

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email) throw new APIError("Email is required", 400);
    if (!password) throw new APIError("Password is required", 400);

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      throw new APIError("User not found", 404);
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new APIError("Invalid credentials", 401);
    }

    const { accessToken, refreshToken } = generateToken(user);


    const addingRefrshToken = await pool.query("UPDATE users SET refresh_token = $1 WHERE email = $2 RETURNING name,email", [
      refreshToken,
      email,
    ]);

    const updatedUser = addingRefrshToken.rows[0];

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(APIResponse.success("Login successful", { ...updatedUser, accessToken }));

  } catch (error) {
    next(error);
  }
};



const registerController = async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  try {
    if (!name) {
      throw new APIError("Name is required", 400);
    }
    if (!email) {
      throw new APIError("Email is required", 400);
    }
    if (!phone) {
      throw new APIError("Phone is required", 400);
    }
    if (!password) {
      throw new APIError("Password is required", 400);
    }

    const updatedName = name.slice(0,1).toUpperCase() + name.slice(1,).toLowerCase();

    const saltRounds = parseInt(process.env.SALT_COUNT) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    console.log(email, hashedPassword);

    let data = await pool.query("INSERT INTO users( name, email, phone, password) values($1,$2,$3,$4) RETURNING email",[updatedName,email,phone,hashedPassword])
    
    console.log(data)
    res.status(200).json(APIResponse.success("Registration successful", { email }));
  } catch (error) {
    next(error); 
  }
};



export {loginController,registerController}