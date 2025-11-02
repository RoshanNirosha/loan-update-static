const fs = require('fs');

// Process usernames.csv to create users.json
function processUsernamesCSV() {
    console.log('Reading usernames.csv...');
    const csvData = fs.readFileSync('usernames.csv', 'utf8');
    const lines = csvData.trim().split('\n');
    
    console.log(`Found ${lines.length} lines in usernames.csv`);
    
    // Skip header line
    const users = [];
    for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',');
        if (parts.length >= 3) {
            const bankName = parts[0].trim();
            const userName = parts[1].trim();
            
            users.push({
                username: userName.toLowerCase().replace(/\s+/g, '_') + '_bank_01',
                password: 'password123', // Using default password
                bank: bankName,
                division: bankName
            });
        }
    }
    
    console.log(`Processed ${users.length} users`);
    
    // Write to users.json
    fs.writeFileSync('users_new.json', JSON.stringify(users, null, 2));
    console.log('Created users_new.json');
    return users;
}

// Process GN List (1).csv to create divisions.json
function processGNListCSV() {
    console.log('Reading GN List (1).csv...');
    const csvData = fs.readFileSync('GN List (1).csv', 'utf8');
    const lines = csvData.trim().split('\n');
    
    console.log(`Found ${lines.length} lines in GN List (1).csv`);
    
    // Skip header line
    const divisions = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Simple split by comma for this data
        const parts = line.split(',');
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
    
    console.log(`Processed ${divisions.length} division entries`);
    
    // Write to divisions.json
    fs.writeFileSync('divisions_new.json', JSON.stringify(divisions, null, 2));
    console.log('Created divisions_new.json');
    return divisions;
}

// Create loans.json with sample data
function createLoansJSON() {
    const loans = [
        {
            beneficiary_name: "John Doe",
            beneficiary_nic: "901234567V",
            beneficiary_address: "123 Main St, Colombo",
            beneficiary_gn_division: "Colombo 01",
            beneficiary_category: "extremelyPoor",
            interest_rate: "8%",
            loan_type: "empowerment",
            project: "agricultural",
            loan_amount: "50000",
            loan_issued_date: "2023-01-15",
            entry_timestamp: "2023-01-15"
        }
    ];
    
    fs.writeFileSync('loans_new.json', JSON.stringify(loans, null, 2));
    console.log('Created loans_new.json');
    return loans;
}

// Run the processing
try {
    console.log('Starting CSV to JSON conversion...');
    processUsernamesCSV();
    processGNListCSV();
    createLoansJSON();
    console.log('Conversion completed successfully!');
} catch (error) {
    console.error('Error:', error);
}