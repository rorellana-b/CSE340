const { Pool } = require("pg");
require("dotenv").config();

/* ***************
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment
 * If - else will make determination which to use
 * *************** */
let pool;

// Condicional para entorno de desarrollo y producción
if (process.env.NODE_ENV === "development") {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,  // Habilitar SSL para desarrollo
        },
    });
} else {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,  // Habilitar SSL también en producción
        },
    });
}

// Exportamos la funcionalidad de pool para cualquier entorno
module.exports = {
    async query(text, params) {
        try {
            const res = await pool.query(text, params);
            console.log("executed query", { text });  // Solo en desarrollo
            return res;
        } catch (error) {
            console.error("error in query", { text });
            throw error;
        }
    },
    pool,  // Exportamos el pool también por si lo necesitas directamente
};