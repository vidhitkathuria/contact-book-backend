const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //fetch token
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //fetch user info from token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.json(401).json({ message: "not authorized" });
    }
  }
  if (!token) {
    console.log("hi");
    return res.status(401).json({
      error: "not authorized, no token",
    });
  }
};

module.exports = { protect };
