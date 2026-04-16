import mysql from 'mysql2';
import mysqlConfig from '../config/mysql.config';
const pool = mysql.createPool(mysqlConfig).promise();
export default pool;
