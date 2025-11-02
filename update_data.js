const fs = require('fs');

// Process usernames.csv to create users.json
function createUsernamesJSON() {
    console.log('Processing usernames.csv...');
    
    const csvData = fs.readFileSync('usernames.csv', 'utf8');
    const lines = csvData.trim().split('\n');
    
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
    
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    console.log(`Created users.json with ${users.length} users`);
}

// Process GN List (1).csv to create divisions.json
function createDivisionsJSON() {
    console.log('Processing GN List (1).csv...');
    
    const csvData = fs.readFileSync('GN List (1).csv', 'utf8');
    const lines = csvData.trim().split('\n');
    
    // Skip header line
    const divisions = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Split by comma but handle quoted fields
        const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if (parts.length >= 2) {
            // Remove quotes and trim
            const division = parts[0].replace(/^"|"$/g, '').trim();
            const gnDivision = parts[1].replace(/^"|"$/g, '').trim();
            
            if (division && gnDivision) {
                divisions.push({
                    division: division,
                    gn_division: gnDivision
                });
            }
        }
    }
    
    fs.writeFileSync('divisions.json', JSON.stringify(divisions, null, 2));
    console.log(`Created divisions.json with ${divisions.length} entries`);
}

// Create an initial loans.json file
function createLoansJSON() {
    console.log('Creating initial loans.json...');
    
    const initialLoans = [
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
        },
        {
            beneficiary_name: "Jane Smith",
            beneficiary_nic: "854567890V",
            beneficiary_address: "456 Park Ave, Colombo",
            beneficiary_gn_division: "Colombo 02",
            beneficiary_category: "samurdhi",
            interest_rate: "4%",
            loan_type: "ranpatha",
            project: "trade",
            loan_amount: "150000",
            loan_issued_date: "2023-02-20",
            entry_timestamp: "2023-02-20"
        }
    ];
    
    fs.writeFileSync('loans.json', JSON.stringify(initialLoans, null, 2));
    console.log('Created loans.json with sample data');
}

// Run all processing functions
try {
    console.log('Starting data processing...');
    createUsernamesJSON();
    createDivisionsJSON();
    createLoansJSON();
    console.log('All data processing completed successfully!');
} catch (error) {
    console.error('Error processing data:', error);
}