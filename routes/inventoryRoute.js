// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController");
const Util = require("../utilities");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to show the vehicle details 
router.get("/detail/:inv_id", invController.getVehicleDetails);

// Route to show the control of inventory
router.get('/', invController.buildInventoryManagementView);

// inventoryRoute.js
router.get("/add-classification", invController.getAddClassificationView);
// router.get("/inv/add-inventory", Util.handleErrors(invController.getAddInventoryView));

module.exports = router;