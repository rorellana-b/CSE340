const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function (req, res) {
    res.render("index", {
        title: "Home",
        nav,
        layout: "layouts/layout"  // Asegurar que use el layout.ejs
    })
}

module.exports = baseController

