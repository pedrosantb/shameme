// Query to get a user on the database by email

import mysql from 'mysql2/promise'

import { GetDBSettings } from "../db/connect"

const connectionParams = GetDBSettings();

export const getUserByEmail = async (email) => {
    try {
        const connection = await mysql.createConnection(connectionParams);
        let query = 'SELECT * FROM User WHERE email = ?;'
        let values = [email]
        const [result] = await connection.execute(query, values);

        connection.end();

        return [result, 200];
    } catch (err) {
        return [{error: err.message}, 500]
    }
}