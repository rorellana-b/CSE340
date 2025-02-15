/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const session = require("express-session")
const flash = require('connect-flash')
// const pool = require('./database')
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const utilities = require("./utilities");
const login = require("./routes/accountRoute");
const bodyParser = require("body-parser")

/* ***********************
 * View Engine and Template
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/layout"); // Layout para las vistas
const static = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");


/* ***********************
 * Middleware
 * ************************/

// Configura el pool de conexión con SSL habilitado
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Usando DATABASE_URL desde .env
    ssl: { rejectUnauthorized: false }  // Esto habilita SSL
});

app.use(session({
    store: new (require('connect-pg-simple')(session))({
        createTableIfMissing: true,
        pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name: 'sessionId',
}))

// Express Messages Middleware
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res)
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


/* ***********************
 * Routes
 *************************/
app.use(static);
// Definimos las rutas
app.get("/", baseController.buildHome);
app.use("/inv", inventoryRoute);
//login route
// app.use("/account", login)
app.use("/account", login)


// File Not Found Route - debe ir al final de todas las rutas
app.use(async (req, res, next) => {
    next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
});

/* ***********************
 * Express Error Handler
 * Este middleware se utiliza para manejar los errores de todas las rutas
 *************************/
app.use(async (err, req, res, next) => {
    let nav = await utilities.getNav();
    console.error(`Error at: "${req.originalUrl}": ${err.message}`);
    res.render("errors/error", {
        title: err.status || 'Server Error',
        message: err.message,
        nav
    });
});

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
    console.log(`app listening on ${host}:${port}`);
});

