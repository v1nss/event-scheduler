const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "pogiako123",
    host: "localhost",
    port: 5432,
    database: "eventscheduler"
});

module.exports = pool;