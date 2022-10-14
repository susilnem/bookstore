import jwt from "jsonwebtoken";
import "dotenv/config";

export default (req, res, next) => {
  const token = req.headers.token;
  // console.log(token);
  if (token) {
    //verifying token here
    try {
      const isValid = jwt.verify(token, process.env.JWT_SECRET);
      console.log(isValid);
      if (isValid) next();
      else {
        return res
          .status(403)
          .json({ success: false, message: "Invalid Token" });
      }
    } catch (error) {
      return res.status(403).json(error);
    }
  } else {
    res.status(403).json({ message: "Please authenticate" });
  }
};
