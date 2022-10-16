import userModel from "../models/userModel.js";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class AuthController {
  //login user
  async login(req, res) {
    try {
      const response = await userModel.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (response === null)
        return res.json({ success: false, message: "user doesnot exist" });
      else {
        //checks the password is matched or not
        const match = bcrypt.compareSync(req.body.password, response.password);
        if (match) {
          //sigining in with the jwt 1st one payload,2nd string for hash and 3rd expire time
          const token = jwt.sign({ id: response.id }, process.env.JWT_SECRET, {
            expiresIn: "1hr",
          });
          delete response.dataValues.password;
          response.dataValues.token = token;
          res.json(response);
        } else {
          res.json({ success: false, message: "Invalid Credential" });
        }
      }
    } catch (err) {
      res.json(err);
    }
  }

  //login user
  // async login(req, res) {
  //   try {
  //     const response = await userModel.findOne({ email: req.body.email });
  //     if (!response) return res.json("email not found");
  //     else return res.json(response);
  //   } catch (err) {
  //     res.json(err);
  //   }
  // }

  //signup user
  async signup(req, res) {
    try {
      const response = await userModel.create({ ...req.body });
      if (response) return res.json({ message: "User created Successfully" });
    } catch (err) {
      res.json(err);
    }
  }

  //user list
  async userList(req, res) {
    try {
      const response = await userModel.findAll();
      if (response === null) return res.json([]);
      else return res.json(response);
    } catch (err) {
      res.json(err);
    }
  }

  //end of authController
}
