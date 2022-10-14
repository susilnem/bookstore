import connection from "./index.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import { DataTypes } from "sequelize";

export default connection.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: {
        msg: "wrong format email",
      },
      notEmpty: {
        msg: "Email not null",
      },
    },
  },
  password: {
    type: DataTypes.TEXT,
    set(value) {
      console.log("value: " + value);
      //using bcrypt to hash the password while storing in database
      const hasedpassword = bcrypt.hashSync(value, 10);
      console.log(hasedpassword);
      this.setDataValue("password", hasedpassword);
    },
  },
});
