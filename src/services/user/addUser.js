// Query to create a new user on the database

import mysql from 'mysql2/promise'

import { GetDBSettings } from "../db/connect"

const connectionParams = GetDBSettings();

export const addUser = async (data) => {
    try {
        const connection = await mysql.createConnection(connectionParams);
        let query = 'INSERT INTO User (email, username, phone) VALUES (?, ?, ?);'
        let values = [data.email, data.username, data.phone]
        const [result] = await connection.execute(query, values);
        
        connection.end();

        if (result.affectedRows === 0) {
            return [{ error: 'User not added' }, 401];
        }

        return [{ message: 'User added successfully' }, 200];
        
    } catch (err) {
        return [{"error": err.message}, 500]
    }
}