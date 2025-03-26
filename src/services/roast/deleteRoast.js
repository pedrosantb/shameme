// Query to create a delete a goal on the database

import mysql from 'mysql2/promise';
import { GetDBSettings } from "../db/connect";

const connectionParams = GetDBSettings();

export const deleteRoast = async (id) => {
    try {
        const connection = await mysql.createConnection(connectionParams);
        let query = 'DELETE FROM Roasts WHERE id = ?'
        let values = [id]
        const [result] = await connection.execute(query, values);

        connection.end();

        if (result.affectedRows === 0) {
            return [{ error: 'Roast not found' }, 404];
        }

        return [{ message: 'Roast deleted successfully' }, 200];
    } catch (err) {
        return [{error: err.message}, 500]
    }
}