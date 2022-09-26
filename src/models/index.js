//connection with mysql using sequelize
import { Sequelize } from "sequelize";
//dotnev to access .env data
import "dotenv/config";

export default new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 5,
    },
  }
);
