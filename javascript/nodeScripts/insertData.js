// insertData.js
const fs = require("fs");
const { parse } = require("csv-parse");
const db = require("./db");

fs.createReadStream("./Data/MOCK_DATA.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    db.serialize(function () {
      db.run(
        `INSERT INTO employee_credentials VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        row,
        function (error) {
          if (error) {
            return console.log(error.message);
          }
          console.log(`Inserted a row with the id: ${this.lastID}`);
        }
      );
    });
  });