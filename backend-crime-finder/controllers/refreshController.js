import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

export const refreshTokenController = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "Refresh token missing" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const newTokens = generateToken({ id: user.id, email: user.email });

    res
      .cookie("refreshToken", newTokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ accessToken: newTokens.accessToken });
  });
};
