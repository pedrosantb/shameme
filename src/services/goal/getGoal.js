// Query to get a goal on the database by ID

import mysql from 'mysql2/promise';
import { GetDBSettings } from "../db/connect";

const connectionParams = GetDBSettings();

export const getGoal = async (id) => {
    try {
        const connection = await mysql.createConnection(connectionParams);        
        let query = 'SELECT * FROM Goals WHERE id = ?;'
        let values = [id]
        const [result] = await connection.execute(query, values);

        connection.end();

        return [result, 200];
    } catch (err) {
        return [{error: err.message}, 500]
    }
}