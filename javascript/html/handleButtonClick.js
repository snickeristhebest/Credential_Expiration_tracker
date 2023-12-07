function handleButtonClick(csvFileName) {
    // alert('Button Clicked: ' + csvFileName);
    
    // Update the CSV file URL based on the button clicked
    var csvUrl = csvFileName;

    // Fetch the data from the updated CSV file URL
    $.ajax({
        url: csvUrl,
        dataType: 'text',
    }).done(displayCsvAsTable);
}

