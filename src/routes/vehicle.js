const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");

const AuthCheck = require("../middleware/AuthCheck");
// Create a new vehicle
router.post("/", AuthCheck, async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Failed to create vehicle." });
  }
});

// Get all Vehicles
router.get("/", AuthCheck, async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users." });
  }
});

// Get user by ID
router.get("/:id", AuthCheck, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) {
      res.status(404).json({ message: "vehicle not found." });
    } else {
      res.json(vehicle);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vehicle." });
  }
});

// Update user by ID
router.put("/:id", AuthCheck, async (req, res) => {
  try {
    const [updatedRowsCount] = await Vehicle.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: "Vehicle not found." });
    } else {
      const vehicle = await Vehicle.findByPk(req.params.id);
      res.json(vehicle);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update Vehicle." });
  }
});

// Delete user by ID
router.delete("/:id", AuthCheck, async (req, res) => {
  try {
    const deletedRowsCount = await Vehicle.destroy({
      where: { id: req.params.id },
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ message: "Vehicle not found." });
    } else {
      res.json({ message: "Vehicle deleted successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Vehicle." });
  }
});

module.exports = router;
