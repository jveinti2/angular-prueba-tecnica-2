import mysql from "promise-mysql"; // npm i promise-mysql@3.3.1
import keys from "./keys";

const pool = mysql.createPool(keys.database);

pool.getConnection().then((connection) => {
  pool.releaseConnection(connection);
  console.log("DB is connected");
});


export default pool; 