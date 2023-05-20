import { Pin } from "../models/Pin.js";

export async function getAllPins(req, res) {
  try {
    const pins = await Pin.findAll();
    res.json(pins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Kontroler do dodawania nowego pina
export async function addPin(req, res) {
  try {
    const { name, lat, lon, color } = req.body;
    const pin = await Pin.create({ name, lat, lon, color });
    res.json(pin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Kontroler do usuwania pina
export async function deletePin(req, res) {
  try {
    const { id } = req.params;
    await Pin.destroy({ where: { id } });
    res.json({ message: "Pin deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Kontroler do modyfikacji pina
export async function updatePin(req, res) {
  try {
    const { id } = req.params;
    const { name, lat, lon, color } = req.body;

    const pin = await Pin.findOne({ where: { id } });
    if (!pin) {
      return res.status(404).json({ message: "Pin not found" });
    }

    pin.name = name;
    pin.lat = lat;
    pin.lon = lon;
    pin.color = color;
    await pin.save();

    res.json(pin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
