import mysql from 'mysql2/promise'

import { GetDBSettings } from "../db/connect"

const connectionParams = GetDBSettings();

export const AddUser = async (data) => {
    try {
        const connection = await mysql.createConnection(connectionParams);
        
        let query = 'INSERT INTO User (email, username) VALUES (?, ?);'
        let values = [data.email, data.username]

        const [result] = await connection.execute(query, values);

        connection.end();

        return [result, 200];
    } catch (err) {
        return [{error: err.message}, 500]
    }
}