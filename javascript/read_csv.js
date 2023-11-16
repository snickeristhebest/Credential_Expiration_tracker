// Define successFunction globally
function successFunction(data) {
    var allRows = data.split(/\r?\n|\r/);
    
    var table = '<table>';
    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
        if (singleRow === 0) {
            table += '<thead>';
            table += '<tr>';
        } else {
            table += '<tr>';
        }
        var rowCells = allRows[singleRow].split(',');
        for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
            if (singleRow === 0) {
                table += '<th>';
                table += rowCells[rowCell];
                table += '</th>';
            } else {
                table += '<td>';
                table += rowCells[rowCell];
                table += '</td>';
            }
        }
        if (singleRow === 0) {
            table += '</tr>';
            table += '</thead>';
            table += '<tbody>';
        } else {
            table += '</tr>';
        }
    }
    table += '</tbody>';
    table += '</table>';
 
    
    $('#table-container').html(table);
}

// Your existing JavaScript code goes here
$(document).ready(function () {
    'use strict';

    $.ajax({
        url: 'Data\\MOCK_DATA.csv',
        dataType: 'text',
    }).done(successFunction);

    // Define the handleButtonClick function
    function handleButtonClick(csvFileName) {
        alert('Button Clicked: ' + csvFileName);

        // Update the CSV file URL based on the button clicked
        var csvUrl = csvFileName;

        // Fetch the data from the updated CSV file URL
        $.ajax({
            url: csvUrl,
            dataType: 'text',
        }).done(successFunction);
    }
});
