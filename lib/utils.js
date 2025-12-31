import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing");

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return token;
  } catch (error) {
    console.error("Error in generateToken:", error);
    throw error;
  }
};
