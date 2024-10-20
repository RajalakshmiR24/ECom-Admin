import jwt from "jsonwebtoken"; // ES module import

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ code: 401, message: "No token provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({
            code: 401,
            message: "Token has expired, please login again",
          });
      }

      return res.status(403).json({ code: 403, message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

export default authMiddleware;
