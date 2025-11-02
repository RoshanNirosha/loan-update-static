const fs = require('fs');

// Read and display usernames.csv
console.log('=== USERNAMES.CSV ===');
const usernamesData = fs.readFileSync('usernames.csv', 'utf8');
const usernameLines = usernamesData.trim().split('\n');
console.log(`Total lines: ${usernameLines.length}`);
console.log('First 5 lines:');
for (let i = 0; i < Math.min(5, usernameLines.length); i++) {
    console.log(`  ${i}: ${usernameLines[i]}`);
}

// Read and display GN List (1).csv
console.log('\n=== GN LIST (1).CSV ===');
const gnData = fs.readFileSync('GN List (1).csv', 'utf8');
const gnLines = gnData.trim().split('\n');
console.log(`Total lines: ${gnLines.length}`);
console.log('First 5 lines:');
for (let i = 0; i < Math.min(5, gnLines.length); i++) {
    console.log(`  ${i}: ${gnLines[i]}`);
}

console.log('\nProcessing complete.');