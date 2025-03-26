// Query to get all goal on the database by user_id

import mysql from 'mysql2/promise';
import { GetDBSettings } from "../db/connect";

const connectionParams = GetDBSettings();

export const getUserRoasts = async (id) => {
    try {
        const connection = await mysql.createConnection(connectionParams);
        let query = 'SELECT * FROM Roasts WHERE user_id = ?;'
        let values = [id]
        const [result] = await connection.execute(query, values);

        connection.end();

        return [result, 200];

    } catch (err) {
        return [{error: err.message}, 500]
    }
}