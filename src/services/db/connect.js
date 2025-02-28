
export const GetDBSettings = () => {
    const connection = {
        host: process.env.DB_HOST_ACCESS,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }

    return connection
}