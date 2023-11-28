//not working
const Database_connection = require('./database/db.js');

const dbConnection = new Database_connection(`C:\\Users\\Marketing\\Documents\\Credential_expiration_tracker\\Credential_Expiration_tracker\\Employee_info.db`);
const title = 'example_table';
const fields = ['name', 'age', 'email'];

dbConnection.query_data(title);
dbConnection.drop_table(title);

// dbConnection.create_table(title,fields);
// const entries = { name: 'wick Doe', age: 25, email: 'john.doe@example.com' };
// dbConnection.insert_data_into_table(title, entries);

// dbConnection.query_data(title);

// dbConnection.delete_data_from(title,'name','aick Doe');

// dbConnection.query_data(title);

// dbConnection.update_data(title,'name','Nick Doe','John Wick');

// dbConnection.query_data(title);