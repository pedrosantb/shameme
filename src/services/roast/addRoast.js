// Query to create a new goal on the database

import mysql from 'mysql2/promise'

import { GetDBSettings } from "../db/connect"

const connectionParams = GetDBSettings();

export const addRoast = async (id, message, goal) => {

    try {
        const connection = await mysql.createConnection(connectionParams);
        let query = 'INSERT INTO Roasts (message, goal, user_id) VALUES(?, ?, ?)';
        let values = [message, goal, id];
        const [result] = await connection.execute(query, values);

        connection.end();

        if (result.affectedRows === 0) {
            return [{ error: 'Roast not added' }, 404];
        }
        return [{ message: 'Roast added successfully' }, 200];
    } catch (err) {
        cosole.log(err);
        return [{error: err.message}, 500]
    }
}