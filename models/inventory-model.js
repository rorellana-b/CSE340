const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

module.exports = { getClassifications }

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
            [classification_id]
        )
        return data.rows
    } catch (error) {
        console.error("getclassificationsbyid error " + error)
    }
}
/* ***************************
 *  Get all vehicle details
 * ************************** */
async function getVehicleById(inv_id) {
    try {
        const query = await pool.query(
            `SELECT inv_make, inv_model, inv_year, inv_price, inv_miles, inv_description, inv_image
             FROM public.inventory 
             WHERE inv_id = $1`,
            [inv_id]
        );
        return query.rows;

    } catch (error) {
        console.error("getVehicleById error " + error);
    }
}
/* *****************************
*   Register new classification
* *************************** */
async function registerClassification(classification_name) {
    try {
        const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
        console.log({ classification_name });
        return await pool.query(sql, [classification_name])
    } catch (error) {
        return error.message
    }
}
/* *****************************
*   Register new inventory
* *************************** */
// async function registerInventory(classification_name) {
//     try {
//         const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
//         console.log({ classification_name });
//         return await pool.query(sql, [classification_name])
//     } catch (error) {
//         return error.message
//     }
// }

//to select the classification in the form
async function getClassificationsForm() {
    try {
        const result = await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
        return result.rows;
    } catch (error) {
        throw new Error("Error fetching classifications: " + error.message);
    }
}
module.exports = { getClassifications, getInventoryByClassificationId, getVehicleById, registerClassification, getClassificationsForm };

