import mysql from 'mysql2/promise';
import { GetDBSettings } from "../db/connect";

const connectionParams = GetDBSettings();

export const DeleteGoal = async (id) => {
    try {
        
        const connection = await mysql.createConnection(connectionParams);
        
        let query = 'DELETE FROM Goals WHERE id = ?'
        let values = [id]

        const [result] = await connection.execute(query, values);

        connection.end();

        return [result, 200];

    } catch (err) {
        return [{error: err.message}, 500]
    }
}