const userModel = require("../modles/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListModel = require("../modles/blacklisttoken.model.js");
const captainModel = require("../modles/captain.model.js");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; //not spliting correctlhy

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "unautharizedd" });
  }

  const isBLacklisted = await blackListModel.findOne({ token: token });

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

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const isBlackListed = await blackListModel.findOne({ token: token });

  if (isBlackListed) {
    return res.status(401).json({ message: "unauthrized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await captainModel.findById(jwt.decode._id);

    req.captain = captain;
    return next();
  } catch (err) {
    res.status(401).json({ message: "unauthorized" });
  }
};
