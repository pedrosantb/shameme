import mysql from 'mysql2/promise';
import { GetDBSettings } from "../db/connect";

const connectionParams = GetDBSettings();

export const updateGoal = async (id, data) => {
    const { title, recurrence, days, status } = data;

    if (!id) {
        return [{ error: 'Goal ID is required' }, 400];
    }

    let query = 'UPDATE Goals SET';
    let values = [];
    const fieldsToUpdate = [];

    if (title) {
        fieldsToUpdate.push('title = ?');
        values.push(title);
    }

    if (recurrence) {
        fieldsToUpdate.push('recurrence = ?');
        values.push(recurrence);
    }


    if (days) {
        fieldsToUpdate.push('days = ?');
        values.push(days);
    }


    if (status) {
        fieldsToUpdate.push('days = ?');
        values.push(days);
    }


    if (fieldsToUpdate.length === 0) {
        return [{ error: 'At least one field is required to update' }, 400];
    }

    query += ` ${fieldsToUpdate.join(', ')} WHERE id = ?`;
    values.push(id);

    try {
        const connection = await mysql.createConnection(connectionParams);
        const [result] = await connection.execute(query, values);

        if (result.affectedRows === 0) {
            return [{ error: 'Goal not found' }, 404];
        }

        return [{ message: 'Goal updated successfully' }, 200];
    } catch (err) {
        return [{ error: err.message }, 500];
    }
};
