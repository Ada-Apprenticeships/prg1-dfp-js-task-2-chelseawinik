
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