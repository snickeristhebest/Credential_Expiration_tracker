const Database_connection = require('./database/db.js');
const CsvReader = require('./database/readCSV.js');

class DatabaseHtmlTableGenerator {
  constructor(databasePath, csvFilePath) {
    this.dbConnection = new Database_connection(databasePath);
    this.csvReader = new CsvReader(csvFilePath);
  }

  async generateHtmlTable() {
    try {
      // Ensure the database connection is established
      // (you might want to add additional checks here)
      await this.dbConnection;

      // Fetch CSV data
      const csvData = await this.csvReader.waitForData();

      // Display CSV data as HTML table
      this.renderTable(csvData);

    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  renderTable(tableHTML) {
    // Your existing logic for displaying the table
    // (assuming you have an element with ID 'table-container')
    $('#table-container').html(tableHTML);
  }

  generateHTMLTable(data) {
    return generateHTMLTable(data)
  }
}

// Example usage
const tableGenerator = new DatabaseHtmlTableGenerator("./Employee_info.db", "./Data/MOCK_DATA.csv");
tableGenerator.generateHtmlTable();