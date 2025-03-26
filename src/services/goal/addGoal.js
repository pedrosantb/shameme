// Query to create a new goal on the database

import mysql from 'mysql2/promise'

import { GetDBSettings } from "../db/connect"

const connectionParams = GetDBSettings();

export const addGoal = async (id, title) => {
    const days = null;
    try {
        const connection = await mysql.createConnection(connectionParams);
        let query = 'INSERT INTO Goals (title, days, user_id) VALUES(?, ?, ?)';
        let values = [title, days, id];
        const [result] = await connection.execute(query, values);

        connection.end();

        if (result.affectedRows === 0) {
            return [{ error: 'Goal not added' }, 404];
        }
        return [{ message: 'Goal added successfully' }, 200];
    } catch (err) {
        return [{error: err.message}, 500]
    }
}