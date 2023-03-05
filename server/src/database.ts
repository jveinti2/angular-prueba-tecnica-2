import mysql from "promise-mysql"; // npm i promise-mysql@3.3.1
import keys from "./keys";

const pool = mysql.createPool(keys.database);

pool.getConnection().then((connection) => {
  pool.releaseConnection(connection);
  console.log("DB is connected");
});


export default pool; 

/* Conexión para sql server
const sql = require("mssql");
const sqlConfig = {
  user: "root2",
  password: "root2",
  database: "newDb",
  server: "localhost",
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

async function getConnection() {
  const pool = await sql.connect(sqlConfig);
  const result = await pool.request().query("SELECT 1 ");
  console.log('Db connected');
  console.log(result);
}

getConnection();
*/
