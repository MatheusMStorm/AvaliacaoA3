async function connect() {
    if (global.connection)
        return global.connection.connect();
 
    const dotenv = require("dotenv");
    dotenv.config();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");
 
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;
    return pool.connect();
}

async function selecionaCriancas() {
    const client = await connect();
    const res = await client.query('SELECT * FROM projeto_iessa.crianca');
    return res.rows;
}
 
module.exports = { selecionaCriancas }

connect();