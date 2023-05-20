import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize("vue", "postgres", process.env.PG_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});
export default sequelize;
