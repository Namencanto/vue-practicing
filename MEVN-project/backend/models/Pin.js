import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Pin = sequelize.define("Pin", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  lat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Pin.sync().then(() => {
  console.log("Model Pin został zsynchronizowany z bazą danych");
});
