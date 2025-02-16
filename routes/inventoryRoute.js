// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController");
const Util = require("../utilities");

// Route to build inventory by classification view
router.get("/type/:classificationId", Util.handleErrors(invController.buildByClassificationId));

// Route to show the vehicle details 
router.get("/detail/:inv_id", Util.handleErrors(invController.getVehicleDetails));

// Route to show the control of inventory
router.get('/', invController.buildInventoryManagementView);

// inventoryRoute.js
router.get("/add-classification", Util.handleErrors(invController.getAddClassificationView));
router.post("/add-classification", Util.handleErrors(invController.registerClassification));
router.get("/add-inventory", Util.handleErrors(invController.getAddInventoryView));
router.post("/add-inventory", Util.handleErrors(invController.registerInventory));

module.exports = router;