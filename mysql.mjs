import mysql from "promise-mysql";
import dotenv from "dotenv";
dotenv.config();

/* istanbul ignore file */
const timeout = 60 * 60 * 1000;
const acquireTimeout = timeout;
const connectionOptions = {
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER || "root",
  ...(process.env.MYSQL_PWD && { password: process.env.MYSQL_PWD }),
  database: process.env.MYSQL_DB,
  timeout,
  acquireTimeout,
};
console.log(connectionOptions);

export const getConnection = async () =>
  await mysql.createPool(connectionOptions);

export const escape = (string) => mysql.escape(string);
