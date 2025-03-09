const userModel = require("../modles/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; //not spliting correctlhy

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "unautharizedd" });
  }

  const isBLacklisted = await userModel.findOne({ token: token });

  if (isBLacklisted) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthrazedd" });
  }
};
