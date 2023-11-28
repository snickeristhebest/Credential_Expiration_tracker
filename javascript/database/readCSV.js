const fs = require('fs');
const { parse } = require('csv-parse');

function logCsvOnConsole(csvURL) {
    parseCsvData(csvURL)
        .then(rows => {
            for(var i=0;i<rows.length;i++){
                console.log(rows[i]);
            }
            
            console.log("finished");
        })
        .catch(error => {
            console.log(error.message);
        });
}

function parseCsvData(csvURL) {
    return new Promise((resolve, reject) => {
        const rows = [];
        fs.createReadStream(csvURL)
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
logCsvOnConsole("./Data/MOCK_DATA.csv")

