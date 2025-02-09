const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    let list = "<ul>"
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list +=
            '<a href="/inv/type/' +
            row.classification_id +
            '" title="See our inventory of ' +
            row.classification_name +
            ' vehicles">' +
            row.classification_name +
            "</a>"
        list += "</li>"
    })
    list += "</ul>"
    return list
}

module.exports = Util


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)



/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
    let grid
    if (data.length > 0) {
        grid = '<ul id="inv-display">'
        data.forEach(vehicle => {
            grid += '<li>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id
                + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + 'details"><img src="' + vehicle.inv_thumbnail
                + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + ' on CSE Motors" /></a>'
            grid += '<div class="namePrice">'
            grid += '<hr />'
            grid += '<h2>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
                + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
                + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
            grid += '</h2>'
            grid += '<span>$'
                + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
            grid += '</div>'
            grid += '</li>'
        })
        grid += '</ul>'
    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

/* **************************************s
* Build the vehicle view HTML
* ************************************ */
Util.buildVehicleHtml = function (vehicleData) {

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(vehicleData.inv_price);

    const formattedMileage = new Intl.NumberFormat("en-US").format(vehicleData.inv_miles);

    return `
        <div class="vehicle-detail">
            <h1>${vehicleData.inv_make} ${vehicleData.inv_model} (${vehicleData.inv_year})</h1>
            <img src="${vehicleData.inv_image}" alt="${vehicleData.inv_make} ${vehicleData.inv_model}" class="vehicle-image" />
            <p><strong>Price:</strong> ${formattedPrice}</p>
            <p><strong>Mileage:</strong> ${formattedMileage} miles</p>
            <p><strong>Description:</strong> ${vehicleData.inv_description}</p>
        </div>
    `;
};