import express from "express";
const router = express.Router();
import {
  addPin,
  deletePin,
  updatePin,
  getAllPins,
} from "../controllers/pin.js";

router.get("/", getAllPins);
router.post("/", addPin);
router.delete("/:id", deletePin);
router.put("/:id", updatePin);

export default router;
