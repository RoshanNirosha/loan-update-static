// Script to convert CSV data to JSON format for the static Loan Update System

// Function to parse CSV data
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(value => value.trim().replace(/"/g, ''));
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });
        data.push(obj);
    }
    
    return data;
}

// Function to convert usernames.csv to users.json format
function convertUsernamesToUsers(usernamesData) {
    return usernamesData.map(row => {
        // Handle potential empty values
        const userName = row['User Name '] || row['Bank Name'] || 'unknown';
        const bankName = row['Bank Name'] || 'Unknown Bank';
        
        return {
            username: userName.toLowerCase().replace(/\s+/g, '_') + '_bank_01',
            password: 'password123', // Default password as per sample
            bank: bankName,
            division: bankName
        };
    });
}

// Function to convert GN List.csv to GN divisions format
function convertGNListToDivisions(gnData) {
    const divisions = {};
    
    gnData.forEach(row => {
        const division = (row['Division'] || '').trim();
        const gnDivision = (row['GN Division'] || '').trim();
        
        // Skip empty rows
        if (!division || !gnDivision) return;
        
        if (!divisions[division]) {
            divisions[division] = [];
        }
        
        divisions[division].push(gnDivision);
    });
    
    // Convert to array format
    const result = [];
    for (const [division, gnDivisions] of Object.entries(divisions)) {
        gnDivisions.forEach(gnDivision => {
            result.push({
                division: division,
                gn_division: gnDivision
            });
        });
    }
    
    return result;
}

// Read and process the CSV files
async function processCSVFiles() {
    try {
        // For Node.js environment, we need to copy the CSV files first
        // In a browser environment, you would need to upload the files
        
        console.log('This script needs to be run in a Node.js environment with access to the CSV files.');
        console.log('Please copy the CSV files to this directory and run the script again.');
        
    } catch (error) {
        console.error('Error processing CSV files:', error);
    }
}

// Run the conversion if we're in Node.js environment
if (typeof require !== 'undefined') {
    processCSVFiles();
}