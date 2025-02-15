const { Client } = require('pg');
require('dotenv').config(); // Asegúrate de tener dotenv instalado

const client = new Client({
    connectionString: process.env.DATABASE_URL, // Usa esta variable si está definida en Render
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => console.log('✅ Conexión exitosa a la base de datos'))
    .catch(err => console.error('❌ Error de conexión:', err))
    .finally(() => client.end());