import { createPool } from "mysql2";
import 'dotenv/config'

const dbConnection = createPool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true,
        connectionLimit: 30
    }
)

dbConnection.on('error',(err) => {
    console.error(`Error connecting to MySQL: ${err.message}`);
    process.exit(1);
});

dbConnection.on('connection',(pool) => {
    console.log(`Connected to MySQL as id ${pool.threadId}`);
    
})

export { 
    dbConnection
}