const invModel = require("../models/inventory-model")
const Util = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await Util.buildClassificationGrid(data)
    let nav = await Util.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

/* ***************************
 *  Build vehicule detail view
 * ************************** */

invCont.getVehicleDetails = async function (req, res) {
    const vehicleId = req.params.inv_id;
    const vehicleData = await invModel.getVehicleById(vehicleId);
    console.log(vehicleData);
    try {
        if (!vehicleData || vehicleData.length === 0) {
            return res.status(404).send("Vehicle not found");
        }
        const vehicle = vehicleData[0];
        if (!vehicle.inv_price) {
            return res.status(404).send("Price information not available for this vehicle");
        }
        const vehicleHtml = Util.buildVehicleHtml(vehicle);
        let nav = await Util.getNav();
        res.render("inventory/vehicleDetails", {
            title: `${vehicle.inv_make} ${vehicle.inv_model}`,
            vehicleHtml,
            layout: "layouts/layout",
            nav,
        });
    } catch (error) {
        console.error("Error fetching vehicle details:", error);
        res.status(500).send("Error retrieving vehicle details.");
    }
};

// Función para construir la vista de gestión de inventario
invCont.buildInventoryManagementView = async function (req, res, next) {
    try {
        const nav = await Util.getNav();  // Obtener la navegación
        res.render("./inventory/add-classification", {
            title: "Agregar Nueva Clasificación",
            nav
        });
    } catch (error) {
        next(error);
    }
}

invCont.getAddClassificationView = async function (req, res, next) {
    try {
        const nav = await Util.getNav();  // Obtener la navegación
        res.render("./inventory/add-classification", {
            title: "Agregar Nueva Clasificación",
            nav
        });
    } catch (error) {
        next(error);
    }
}

// Función para mostrar la vista de agregar inventario
invCont.getAddInventoryView = async function (req, res, next) {
    try {
        const nav = await Util.getNav();  // Obtener la navegación
        res.render("./inventory/add-inventory", {
            title: "Agregar Nuevo Inventario",
            nav
        });
    } catch (error) {
        next(error);
    }
}


module.exports = invCont