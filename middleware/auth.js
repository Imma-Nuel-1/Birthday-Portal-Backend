// const token = jwt.sign(
//   {
//     id: user._id,
//     isAdmin: user._id.toString() === process.env.ADMIN_USER_ID,
//   },
//   process.env.JWT_SECRET,
//   { expiresIn: "1h" } // Adjust time as needed
// );

const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authenticate;

