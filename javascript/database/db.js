const sqlite3 = require('sqlite3').verbose();



class Database_connection {
    constructor(Path_to_database) {
        this.db = new sqlite3.Database(Path_to_database, sqlite3.OPEN_READWRITE, (err) => {
            if (err) return console.error(err.message);
        
        });

        // Initialize shared structure to store table information
        // if (!Database_connection.sharedTables) {
        //     Database_connection.sharedTables = new SharedTables();
        // }
    }

    // title is a string, fields is an array of strings
    // creates a table
    create_table(title, fields) {
        // Check if the table already exists
        this.db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [title], (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }

            if (!row) {
                // Table does not exist, create it
                let sql = `CREATE TABLE ${title} (id INTEGER PRIMARY KEY,`;

                for (let i = 0; i < fields.length; i++) {
                    sql += `${fields[i]} ${i === fields.length - 1 ? '' : ','}`;
                }

                sql += ');';

                // Store fields in the shared structure
                // Database_connection.sharedTables.addTable(title, fields);

                // Execute the SQL statement
                this.db.run(sql, (err) => {
                    if (err) return console.error(err.message);
                    console.log(`Table ${title} created successfully`);
                });
            } else {
                // Table already exists
                console.log(`Table ${title} already exists`);
            }
        });
    }



    // title is a string
    // drop_table(title) drops from the database the table specified in the argument
    drop_table(title) {
        // Construct the SQL DROP TABLE statement
        const sql = `DROP TABLE IF EXISTS ${title}`;

        // Execute the SQL statement
        this.db.run(sql, (err) => {
            if (err) {
                return console.error(`Error dropping table ${title}:`, err.message);
            }

            console.log(`Table ${title} dropped successfully`);
        });
    }

    get_fields(title) {
        return new Promise((resolve, reject) => {
            this.db.all(`PRAGMA table_info(${title})`, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                const fields = rows.map((row) => row.name);
                resolve(fields);
            });
        });
    }

    // title is a string, entries is an object with field-value pairs
    // insert_data_into_table(title, entries) inserts data into the specified table
    insert_data_into_table(title, entries) {
        this.get_fields(title)
            .then((fields) => {
                if (!fields) {
                    console.error(`Table ${title} does not exist or has no fields.`);
                    return;
                }
    
                let sql = `INSERT INTO ${title} (${fields.join(', ')}) VALUES (`;
                const values = [];
    
                fields.forEach((field) => {
                    values.push(entries[field] !== undefined ? `'${entries[field]}'` : 'NULL');
                });
    
                sql += `${values.join(', ')});`;
    
                // Execute the SQL statement
                this.db.run(sql, (err) => {
                    if (err) return console.error(err.message);
                    console.log(`Data inserted into ${title} successfully`);
                });
            })
            .catch((error) => {
                console.error(`Error retrieving fields:`, error.message);
            });
    }

    query_data(title){
        let sql=`SELECT * FROM ${title}`;
        this.db.all(sql,[],(err, rows)=>{
            if (err) return console.error(err.message);
                rows.forEach(row=>{
                    console.log(row);
                })
        });
    }

    //title is string,field is string,entery is string
    //removes entry from specified table, using the field provided
    // title is a string, field is a string, entry is a string
    // removes entry from specified table, using the field provided
    delete_data_from(title, field, entry) {
        // Ensure title, field, and entry are provided
        if (!title || !field || !entry) {
            console.error(`Title, field, and entry are required.`);
            return;
        }

        // Construct the SQL DELETE statement
        const sql = `DELETE FROM ${title} WHERE ${field} = ?`;

        // Execute the SQL statement with the specified parameter
        this.db.run(sql, [entry], (err) => {
            if (err) {
                return console.error(`Error deleting data from ${title}:`, err.message);
            }

            console.log(`Data deleted from ${title} where ${field} is: ${entry}`);
        });
    }

    //title is string,field is string,entery is string
    //removes entry from specified table, using the field provided
    // title is a string, field is a string, entry is a string, newValue is a string
    // updates entry from specified table, using the field provided
    update_data(title, field, entry, newValue) {
        // Ensure title, field, entry, and newValue are provided
        if (!title || !field || !entry || newValue === undefined) {
            console.error(`Title, field, entry, and newValue are required.`);
            return;
        }

        // Construct the SQL UPDATE statement
        const sql = `UPDATE ${title} SET ${field} = ? WHERE ${field} = ?`;

        // Execute the SQL statement with the specified parameters
        this.db.run(sql, [newValue, entry], (err) => {
            if (err) {
                return console.error(`Error updating data in ${title}:`, err.message);
            }

            console.log(`Data updated in ${title} where ${field} is: ${entry}. Set ${field} to: ${newValue}`);
        });
    }


}



module.exports = Database_connection;
