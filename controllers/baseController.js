const utilities = require("../utilities/")
const baseController = {}
const inventoryModel = require("../models/inventory-model");

baseController.buildHome = async function (req, res) {
    const nav = await utilities.getNav();
    res.render("index", {
        title: "Home",
        nav,
        layout: "layouts/layout"
    })
}

module.exports = baseController

