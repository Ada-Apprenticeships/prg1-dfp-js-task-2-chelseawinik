

/*const fs = require('fs');

function parseFile(inputFilePath, outputFilePath, delimiter = ';') {
  // Check if the input file exists
  if (!fs.existsSync(inputFilePath)) {
    return -1; // Return -1 if the input file does not exist
  }

  // Remove the output file if it already exists
  if (fs.existsSync(outputFilePath)) {
    fs.unlinkSync(outputFilePath);
  }

  // Read the input file with UTF-8 encoding
  const fileContent = fs.readFileSync(inputFilePath, 'utf-8');

  // Split the file content into lines
  const lines = fileContent.split('\n');

  // Initialize a counter for exported records
  let exportedRecords = 0;

  // Process each line starting from the second line (ignore the header)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim(); // Trim whitespace from the line

    // Skip empty lines
    if (line === '') {
      continue;
    }

    // Split the line into columns using the specified delimiter
    const columns = line.split(delimiter);

    // Ensure there are exactly two columns (review and sentiment)
    if (columns.length === 2) {
      const review = columns[0].trim();
      const sentiment = columns[1].trim();

      // Trim the review to 20 characters
      const trimmedReview = review.substring(0, 20);

      // Reverse the column order and join with the delimiter
      const transformedLine = `${sentiment}${delimiter}${trimmedReview}\n`;

      // Append the transformed line to the output file
      fs.appendFileSync(outputFilePath, transformedLine, 'utf-8');

      // Increment the exported records counter
      exportedRecords++;
    }
  }

  // Return the total number of records exported
  return exportedRecords;
}

// Leave this code here for the automated tests
module.exports = {
  parseFile,
};*/

const fs = require('fs');

function parseFile(indata, outdata, delimiter = ';') {
  if (!fs.existsSync(indata)) return -1; // Return -1 if input file doesn't exist

  if (fs.existsSync(outdata)) fs.unlinkSync(outdata); // Delete output file if it exists

  const fileContent = fs.readFileSync(indata, 'utf-8'); // Read input file
  const lines = fileContent.split('\n'); // Split content into lines
  let exportedRecords = 0; // Counter for exported records

  for (let i = 1; i < lines.length; i++) { // Skip header (first line)
    const line = lines[i].trim(); // Trim whitespace
    if (!line) continue; // Skip empty lines

    const columns = line.split(delimiter); // Split line by delimiter
    if (columns.length === 2) { // Ensure there are exactly 2 columns
      const [review, sentiment] = columns.map(col => col.trim()); // Trim columns
      const trimmedReview = review.substring(0, 20); // Trim review to 20 characters
      const transformedLine = `${sentiment}${delimiter}${trimmedReview}\n`; // Reverse columns

      fs.appendFileSync(outdata, transformedLine, 'utf-8'); // Write to output file
      exportedRecords++; // Increment record count
    }
  }

  return exportedRecords; // Return total exported records
}

// Leave this code here for the automated tests
module.exports = {
  parseFile,
};