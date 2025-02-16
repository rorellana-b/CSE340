const invModel = require("../models/inventory-model")
const Util = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    try {
        const classification_id = req.params.classificationId;
        const data = await invModel.getInventoryByClassificationId(classification_id);

        // Verificar si hay datos antes de acceder a data[0]
        if (!data || data.length === 0) {
            return res.status(404).render("error", {
                title: "No Vehicles Found",
                message: "No vehicles found for this classification.",
                nav: await Util.getNav(),
            });
        }

        const grid = await Util.buildClassificationGrid(data);
        const nav = await Util.getNav();
        const className = data[0].classification_name;

        res.render("./inventory/classification", {
            title: className + " vehicles",
            nav,
            grid,
        });
    } catch (error) {
        console.error("Error in buildByClassificationId:", error);
        res.status(500).render("error", {
            title: "Server Error",
            message: "An error occurred while retrieving the inventory.",
            nav: await Util.getNav(),
        });
    }
    // const classification_id = req.params.classificationId
    // const data = await invModel.getInventoryByClassificationId(classification_id)
    // const grid = await Util.buildClassificationGrid(data)
    // let nav = await Util.getNav()
    // const className = data[0].classification_name
    // res.render("./inventory/classification", {
    //     title: className + " vehicles",
    //     nav,
    //     grid,
    // })
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
        res.render("./inventory/management", {
            title: "Vehicle Management",
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
            title: "Add New Classification",
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
        const classifications = await invModel.getClassificationsForm();
        res.render("./inventory/add-inventory", {
            title: "Add new Inventory",
            classifications,
            nav
        });
    } catch (error) {
        next(error);
    }
}

// Función para mostrar la vista de agregar clasificacion
invCont.registerClassification = async function (req, res, next) {
    let nav = await Util.getNav()

    //get info at the form
    const { classification_name } = req.body

    try {
        res.status(500).render("inventory/management", {
            title: "Add Classification",
            nav,
            message: "Adding Successfully",
            errors: null,
        });
    }
    catch (error) {
        next(error)
        res.status(500).send("Error adding classification.");
    }
    const regResult = await invModel.registerClassification(
        classification_name
    )
    if (regResult) {
        req.flash(
            "notice",
            `Congratulations, you\'re registered ${account_firstname}. Please log in.`
        )
        res.status(201).render("inventory/login", {
            title: "Login",
            nav,
        })
    } else {
        req.flash("notice", "Sorry, the registration failed.")
        res.status(501).render("account/register", {
            title: "Registration",
            nav,
        })
    }
}

// Función para mostrar la vista de agregar inventario
invCont.registerClassification = async function (req, res, next) {
    let nav = await Util.getNav()

    //get info at the form
    const { classification_name } = req.body

    try {
        res.status(500).render("inventory/management", {
            title: "Add Classification",
            nav,
            message: "Adding Successfully",
            errors: null,
        });
    }
    catch (error) {
        next(error)
        res.status(500).send("Error adding classification.");
    }
    const regResult = await invModel.regiterInventory(
        classification_name
    )
    if (regResult) {
        req.flash(
            "notice",
            `Congratulations, you\'re registered ${account_firstname}. Please log in.`
        )
        res.status(201).render("inventory/login", {
            title: "Login",
            nav,
        })
    } else {
        req.flash("notice", "Sorry, the registration failed.")
        res.status(501).render("account/register", {
            title: "Registration",
            nav,
        })
    }
}

module.exports = invCont