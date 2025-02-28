import mysql from 'mysql2/promise';
import { GetDBSettings } from "../db/connect";

const connectionParams = GetDBSettings();

export const UpdateUser = async (id, data) => {
    const { phone, telegram_id } = data;

    if (!id) {
        return [{ error: 'User ID is required' }, 400];
    }

    let query = 'UPDATE users SET';
    let values = [];
    const fieldsToUpdate = [];

    if (phone) {
        fieldsToUpdate.push('phone = ?');
        values.push(phone);
    }

    if (telegram_id) {
        fieldsToUpdate.push('telegram_id = ?');
        values.push(telegram_id);
    }

    if (fieldsToUpdate.length === 0) {
        return [{ error: 'At least one field (phone or telegram_id) is required to update' }, 400];
    }

    query += ` ${fieldsToUpdate.join(', ')} WHERE id = ?`;
    values.push(id);

    try {
        const connection = await mysql.createConnection(connectionParams);
        const [result] = await connection.execute(query, values);

        if (result.affectedRows === 0) {
            return [{ error: 'User not found' }, 404];
        }

        return [{ message: 'User updated successfully' }, 200];
    } catch (err) {
        return [{ error: err.message }, 500];
    }
};
