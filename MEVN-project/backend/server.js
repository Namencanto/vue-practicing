import express from "express";
import pinsRouter from "./routes/pins.js";
import sequelize from "./config/db.js";
import cors from "cors";

// Initialize the Express application
const app = express();
app.use(cors());
app.use(express.json());

// Create the tables in the database
sequelize.sync().then(() => {
  console.log("Tables created");
});

app.use("/api/pins", pinsRouter);

// Start listening on port 3000
app.listen(3001, () => {
  console.log("Server is listening on port 3000");
});
