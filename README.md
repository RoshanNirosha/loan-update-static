# Loan Update System - Static Version

This is a static version of the Loan Update System built with only HTML, CSS, and JavaScript, without any database integration. All data is stored in separate JSON files that are populated from CSV files.

## Features

- User authentication with 88 bank users from usernames.csv
- Dashboard with loan summaries
- Loan data entry form with validation
- GN Division dropdown populated from GN List (1).csv
- Responsive design that works on desktop and mobile
- No backend or database required
- Data stored in separate JSON files

## How to Use

1. Open `index.html` in a web browser
2. Click "Access System" to go to the login page
3. Use one of the 88 bank accounts (e.g., username: `bemmulla_bank_01`, password: `password123`)
4. After logging in, you can:
   - View existing loan data on the dashboard
   - Enter new loan data using the "Enter New Loan" button
   - Log out when finished

## Data Storage

All data is stored in separate JSON files that are populated from CSV files:
- `users.json` - Contains user login credentials (from usernames.csv)
- `divisions.json` - Contains GN divisions data (from GN List (1).csv)
- `loans.json` - Contains loan data entries

In this static version, data is read from these files. In a full server implementation, data would also be written back to these files.

## Files

- `index.html` - Main entry point
- `login.html` - User login page
- `dashboard.html` - Main dashboard with loan data
- `loan_form.html` - Form for entering new loan data
- `users.json` - User credentials storage (88 banks)
- `divisions.json` - GN divisions data (~1,177 entries)
- `loans.json` - Loan data storage
- `background.png` - Background image for the login page
- `usernames.csv` - Source data for users.json
- `GN List (1).csv` - Source data for divisions.json

## Browser Compatibility

This application works in all modern browsers that support fetch API and localStorage, including:
- Chrome 42+
- Firefox 39+
- Safari 10+
- Edge 14+
- Internet Explorer (with polyfills)

## Limitations

Since this is a static version without a backend:
- Data is read from JSON files but cannot be written back in a static environment
- For full functionality, a web server with file write capabilities is needed
- User management is limited to the users included in usernames.csv

For a production environment with full data persistence, please refer to the original Loan Update System with database integration.