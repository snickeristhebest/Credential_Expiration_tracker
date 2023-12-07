const fs = require('fs');
const { parse } = require('csv-parse');

class CsvReader {
    constructor(csvURL) {
        this.csvURL = csvURL;
    }

    consoleLog() {
        this.parseData()
            .then(rows => {
                for (let i = 0; i < rows.length; i++) {
                    console.log(rows[i]);
                }

                console.log("finished");
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    parseData() {
        return new Promise((resolve, reject) => {
            const rows = [];
            fs.createReadStream(this.csvURL)
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", function (row) {
                    rows.push(row);
                })
                .on("end", function () {
                    resolve(rows);
                })
                .on("error", function (error) {
                    reject(error);
                });
        });
    }

    async waitForData() {
        try {
            const parsedData = await this.parseData();
            return parsedData;
        } catch (error) {
            console.error('Error:', error.message);
            throw error; // Propagate the error if needed
        }
    }

    getData(){
        return this.waitForData()
    }

}

module.exports = CsvReader;