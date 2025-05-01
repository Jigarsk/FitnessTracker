import jwt from "jsonwebtoken";

// Auth middleware function
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "9f2c7a58e5c9a7b8f1c6749e27a36a847be87150f4811c879f25aa4d52401915");
    req.user = decoded; // Assign decoded token to the request object
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};
