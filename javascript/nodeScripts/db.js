const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./population.db";

function connectToDatabase() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
      console.log("Connected to the database successfully");
    });
    return db;
  }
}

function createTable(db) {
    db.exec(`
    CREATE TABLE employee_credentials
    (
        Employee Name           VARCHAR(50),
        Employee Title/Type     VARCHAR(50),
        Emails                  VARCHAR(50),
        State License           VARCHAR(50),
        Add'tl Cert No.         VARCHAR(50),
        Hired Date              VARCHAR(50),
        Renewal Term (YR)       VARCHAR(50),
        Current State License   VARCHAR(50),
        CCC/OTR Certification   VARCHAR(50),
        Driver's License        VARCHAR(50),
        TB Test                 VARCHAR(50),
        CPR/first aid           VARCHAR(50),
        Auto Liability          VARCHAR(50),
        Performance Review      VARCHAR(50),
        Competency Assessement  VARCHAR(50),
        In House Training       VARCHAR(50),
        *Billing Agreement      VARCHAR(50),
        ANE EXAM                VARCHAR(50)

    )
  `, function(error) {
    if (error) {
      return console.error(error.message);
    }
    console.log("Table created successfully");
  });
}

module.exports = connectToDatabase();