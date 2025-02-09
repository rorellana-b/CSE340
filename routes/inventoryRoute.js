// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to show the vehicle details 
router.get("/detail/:inv_id", invController.getVehicleDetails);

module.exports = router;