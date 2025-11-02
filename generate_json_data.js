const fs = require('fs');
const path = require('path');

// Set the working directory to ensure we're in the right place
const workingDir = process.cwd();
console.log(`Working directory: ${workingDir}`);

// Function to process usernames.csv
function processUsernames() {
    console.log('\n--- Processing Usernames ---');
    const csvPath = path.join(workingDir, 'usernames.csv');
    console.log(`Reading from: ${csvPath}`);
    
    if (!fs.existsSync(csvPath)) {
        throw new Error(`File not found: ${csvPath}`);
    }
    
    const csvData = fs.readFileSync(csvPath, 'utf8');
    const lines = csvData.trim().split('\n');
    
    console.log(`Found ${lines.length} lines`);
    
    // Process data (skip header)
    const users = [];
    for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',');
        if (parts.length >= 3) {
            const bankName = parts[0].trim();
            const userName = parts[1].trim();
            
            users.push({
                username: userName.toLowerCase().replace(/\s+/g, '_') + '_bank_01',
                password: 'password123',
                bank: bankName,
                division: bankName
            });
        }
    }
    
    console.log(`Processed ${users.length} users`);
    
    // Write to file in the same directory
    const outputPath = path.join(workingDir, 'users.json');
    console.log(`Writing to: ${outputPath}`);
    fs.writeFileSync(outputPath, JSON.stringify(users, null, 2));
    console.log('Users JSON file created successfully');
    
    return users;
}

// Function to process GN List (1).csv
function processGNList() {
    console.log('\n--- Processing GN List ---');
    const csvPath = path.join(workingDir, 'GN List (1).csv');
    console.log(`Reading from: ${csvPath}`);
    
    if (!fs.existsSync(csvPath)) {
        throw new Error(`File not found: ${csvPath}`);
    }
    
    const csvData = fs.readFileSync(csvPath, 'utf8');
    const lines = csvData.trim().split('\n');
    
    console.log(`Found ${lines.length} lines`);
    
    // Process data (skip header)
    const divisions = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Split by comma
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
    
    // Write to file in the same directory
    const outputPath = path.join(workingDir, 'divisions.json');
    console.log(`Writing to: ${outputPath}`);
    fs.writeFileSync(outputPath, JSON.stringify(divisions, null, 2));
    console.log('Divisions JSON file created successfully');
    
    return divisions;
}

// Function to create sample loans data
function createLoansData() {
    console.log('\n--- Creating Loans Data ---');
    
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
    
    // Write to file in the same directory
    const outputPath = path.join(workingDir, 'loans.json');
    console.log(`Writing to: ${outputPath}`);
    fs.writeFileSync(outputPath, JSON.stringify(loans, null, 2));
    console.log('Loans JSON file created successfully');
    
    return loans;
}

// Main execution
try {
    console.log('Starting JSON data generation from CSV files...');
    
    // Process all data
    const users = processUsernames();
    const divisions = processGNList();
    const loans = createLoansData();
    
    console.log('\n=== SUMMARY ===');
    console.log(`Users: ${users.length}`);
    console.log(`Divisions: ${divisions.length}`);
    console.log(`Loans: ${loans.length}`);
    console.log('All JSON files generated successfully!');
    
} catch (error) {
    console.error('Error during processing:', error);
    process.exit(1);
}