// Function to create table header
function createTableHeader(headerCells) {
    var headerHTML = '<thead><tr>';
    for (var i = 0; i < headerCells.length; i++) {
        headerHTML += '<th>' + headerCells[i] + '</th>';
    }
    headerHTML += '</tr></thead>';
    return headerHTML;
}

// Function to create table row
function createTableRow(rowCells) {
    var rowHTML = '<tr>';
    for (var i = 0; i < rowCells.length; i++) {
        rowHTML += '<td>' + rowCells[i] + '</td>';
    }
    rowHTML += '</tr>';
    return rowHTML;
}

// Function to create table body
function createTableBody(dataRows) {
    var bodyHTML = '<tbody>';
    for (var i = 1; i < dataRows.length; i++) {
        bodyHTML += createTableRow(dataRows[i].split(','));
    }
    bodyHTML += '</tbody>';
    return bodyHTML;
}

// Function to generate the HTML table
function generateHTMLTable(data) {
    var allRows = data.split(/\r?\n|\r/);
    var headerCells = allRows[0].split(',');

    var tableHTML = '<table>';
    tableHTML += createTableHeader(headerCells);
    tableHTML += createTableBody(allRows);
    tableHTML += '</table>';

    return tableHTML;
}

// Function to display the table in the HTML element
function displayTable(tableHTML) {
    $('#table-container').html(tableHTML);
}

// Main function
function displayAsTable(data) {
    var tableHTML = generateHTMLTable(data);
    displayTable(tableHTML);
}


$(document).ready(function () {
    'use strict';

    // Main function to be executed when the document is ready
    function initialize() {
        fetchCsvData('Data\\MOCK_DATA.csv', processData);
    }

    // Function to fetch CSV data using AJAX
    function fetchCsvData(url, callback) {
        $.ajax({
            url: url,
            dataType: 'text',
        }).done(callback);
    }

    // Function to process and display CSV data as an HTML table
    function processData(csvData) {
        var tableHTML = generateHTMLTable(csvData);
        displayTable(tableHTML);
    }

    initialize();
});

