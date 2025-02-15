//Needed Resources 
const regValidate = require('../utilities/account-validation')
const express = require("express")
const accountController = require("../controllers/accountController")
const route = new express.Router()
const utilities = require('../utilities')
const router = require("./static")

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

//Login View 
router.get("/login", utilities.handleErrors(accountController.buildLogin));

//Register Login
router.get("/register", utilities.handleErrors(accountController.buildRegister));

//Register post
router.post("/register", utilities.handleErrors(accountController.registerAccount))


module.exports = router;

