const fs = require('fs');

// Read usernames.csv and convert to users.json
function processUsernames() {
    const csvData = fs.readFileSync('usernames.csv', 'utf8');
    const lines = csvData.trim().split('\n');
    
    // Skip header line
    const users = [];
    for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',');
        if (parts.length >= 3) {
            const bankName = parts[0].trim();
            const userName = parts[1].trim();
            //const password = parts[2].trim();
            
            users.push({
                username: userName.toLowerCase().replace(/\s+/g, '_') + '_bank_01',
                password: 'password123', // Using default password as in sample
                bank: bankName,
                division: bankName
            });
        }
    }
    
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    console.log(`Processed ${users.length} users into users.json`);
    return users;
}

// Read GN List (1).csv and convert to divisions.json
function processGNList() {
    const csvData = fs.readFileSync('GN List (1).csv', 'utf8');
    const lines = csvData.trim().split('\n');
    
    // Skip header line
    const divisions = [];
    for (let i = 1; i < lines.length; i++) {
        // Handle quoted fields that may contain commas
        const parts = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if (parts.length >= 2) {
            const division = parts[0].trim().replace(/^"|"$/g, '');
            const gnDivision = parts[1].trim().replace(/^"|"$/g, '');
            
            if (division && gnDivision) {
                divisions.push({
                    division: division,
                    gn_division: gnDivision
                });
            }
        }
    }
    
    fs.writeFileSync('divisions.json', JSON.stringify(divisions, null, 2));
    console.log(`Processed ${divisions.length} division entries into divisions.json`);
    return divisions;
}

// Run the processing
try {
    console.log('Processing CSV files...');
    processUsernames();
    processGNList();
    console.log('Data processing completed successfully!');
} catch (error) {
    console.error('Error processing data:', error);
}