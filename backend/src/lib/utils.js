import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Milliseconds
    httpOnly: true, // Prevents cross-site scripting (XSS) attacks
    sameSite: "strict", // Cross-site request forgery (CSRF) attacks
    secure: process.env.NODE_ENV !== "development", // True if not in development
  });

  return token;
};
